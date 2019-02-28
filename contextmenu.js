const { remote } = require('electron');
const { Menu, MenuItem } = remote;
const db1=require("./db.js");

const menu = new Menu();
let rightClickPosition = null

menu.append(new MenuItem({ label: 'Add Tag', click(){addTag()} }));
menu.append(new MenuItem({ type: 'separator' }));
menu.append(new MenuItem({ label: 'Rename'}));
menu.append(new MenuItem({ label: 'Delete'}));

document.getElementById('listed-files').addEventListener('contextmenu', (e) => {
    e.preventDefault()
    console.log("right clicked");
    rightClickPosition = {x: e.x, y: e.y}
    menu.popup({ window: remote.getCurrentWindow() })
}, false);


function addTag(){
    var fileid=document.elementFromPoint(rightClickPosition.x,rightClickPosition.y).id;
    console.log(fileid);
    db1.addData(fileid,"file_name","test1,test2");
};