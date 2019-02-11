const fs = require('fs');
const {shell} = require('electron');

var dir;
var dir_path;

readFolder('');

document.getElementById('fxbtn').addEventListener('click', _ => {
    dir=document.getElementById('seldir');
    dir.click();
})

document.getElementById('clbtn').addEventListener('click', _ => {
    dir_path=dir.files[0].path;
    readFolder(dir_path);
})

document.getElementById('back').addEventListener('click', _ => {
    console.log("current : "+dir_path)
})

function readFolder(path) {
    console.log(path);
    dir_path=path.replace(/%20/g,' ')+'\\';
    console.log(dir_path);
    fs.readdir(dir_path, (err, files) => {
        'use strict';
        if (err) throw  err;
        document.getElementById('listed-files').innerHTML = `<ul id="display-files"></ul>`;
        for (let file of files) {
            fs.stat(dir_path + file, (err, stats) => {
                let theID =(dir_path+file).replace(/ /g,'%20');
                
                if (err) throw err;
                if (stats.isDirectory()) {
                    document.getElementById('display-files').innerHTML += `<li id=${theID} style="cursor:pointer" ondblclick="readFolder(this.id)"><i class="fa fa-folder-open"></i> ${file}</li>`;
                }
                else {
                    document.getElementById('display-files').innerHTML += `<li id=${theID} style="cursor:pointer" ondblclick="openFile(this.id)"><i class="fa fa-file"></i> ${file}</li>`;
                }
            });
        }
    });
}

function openFile(path) {
    dir_path=path.replace(/%20/g,' ')+'\\';
    shell.openItem(dir_path);
}

