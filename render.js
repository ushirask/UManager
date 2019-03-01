const foldernav=require('./foldernav.js');
const db=require('./db.js');
var path = require('path');

var dir;
var dir_path;
current='C:\\';

foldernav.readFolder('C:\\');
db.createDatabase();

document.getElementById('seldir').addEventListener('input', _ => {
    dir_path=dir.files[0].path+'\\';
    console.log(dir_path);
    foldernav.readFolder(dir_path);
})

document.getElementById('fxbtn').addEventListener('click', _ => {
    dir=document.getElementById('seldir');
    dir.click();
})

document.getElementById('home').addEventListener('click', _ => {
    foldernav.readFolder('C:\\');
})

document.getElementById('back').addEventListener('click', _ => {
    console.log(path.dirname(current)+'\\');
    foldernav.readFolder(path.dirname(current)+'\\');

})

