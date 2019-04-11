const { remote } = require('electron');
const { dialog, Menu, MenuItem } = remote;
const prompt = require('electron-prompt');
const fileop=require('./fileop.js');

const menu = new Menu();
let rightClickPosition = null;

menu.append(new MenuItem({
     label: 'Tag File', click(){tagFile()} }));
menu.append(new MenuItem({
     type: 'separator' }));
menu.append(new MenuItem({
     label: 'Rename',click(){fileop.renamefile(document.elementFromPoint(rightClickPosition.x,rightClickPosition.y).id)}}));
menu.append(new MenuItem({
     label: 'Delete',click(){fileop.deletefile(document.elementFromPoint(rightClickPosition.x,rightClickPosition.y).id)}}));

document.getElementById('listed-files').addEventListener('contextmenu', (e) => {
    e.preventDefault()
    rightClickPosition = {x: e.x, y: e.y}
    menu.popup({ window: remote.getCurrentWindow() })
}, false);


async function tagFile(){
    var fileid=document.elementFromPoint(rightClickPosition.x,rightClickPosition.y).id;
    var tagList=await db.getTagList();
    prompt({
     title: 'Add Tag',
     label: 'Tag Name:',
     type: 'select',
     selectOptions: tagList
     }).then((tag) => {
          if(tag === null) {
          console.log('user cancelled');
          } else {
               db.addTagData(fileid,"file_name",tag);
               dialog.showMessageBox({buttons:["OK"], message:"Tag added successfully",title:"UManager",type:"info"});
          }
     }).catch(console.error);
    
};

