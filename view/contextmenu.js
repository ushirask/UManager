const { remote } = require('electron');
const { dialog, Menu, MenuItem } = remote;
const prompt = require('electron-prompt');
const fileop=require('./application/fileop.js');

const menu = new Menu();
let rightClickPosition = null;

menu.append(new MenuItem({
     label: 'Tag File', click(){tagFile()} }));
menu.append(new MenuItem({
     type: 'separator' }));
menu.append(new MenuItem({
     label: 'Delete',click(){fileop.deletefile(document.elementFromPoint(rightClickPosition.x,rightClickPosition.y).id)}}));

document.getElementById('listed-files').addEventListener('contextmenu', (e) => {
    e.preventDefault()
    rightClickPosition = {x: e.x, y: e.y}
    menu.popup({ window: remote.getCurrentWindow() })
}, false);


async function tagFile(){
    var fileid=document.elementFromPoint(rightClickPosition.x,rightClickPosition.y).id;
    var file_name=document.elementFromPoint(rightClickPosition.x,rightClickPosition.y).innerText;
    var tagList=await db.getTagList();
    prompt({
     title: 'Add Tag',
     label: 'Tag Name:',
     type: 'select',
     height: 160,
     selectOptions: tagList
     },remote.getCurrentWindow()).then((tag) => {
          if(tag === null) {
          } else {
               db.addTagData(fileid,file_name,tagList[tag]);
               dialog.showMessageBox({buttons:["OK"], message:"Tag added successfully",title:"UManager",type:"info"});
          }
     }).catch(console.error);
    
};

