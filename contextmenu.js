const { remote } = require('electron');
const { dialog, Menu, MenuItem } = remote;
const fileop=require('./fileop.js');

const menu = new Menu();
let rightClickPosition = null;

menu.append(new MenuItem({
     label: 'Add Tag', click(){addTag()} }));
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


function addTag(){
    var fileid=document.elementFromPoint(rightClickPosition.x,rightClickPosition.y).id;
    db.addTagData(fileid,"file_name","test1");
    console.log(dialog.showMessageBox({buttons:["OK"], message:"Tag added successfully",title:"UManager",type:"info"}))
};

