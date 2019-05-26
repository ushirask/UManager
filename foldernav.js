const {shell} = require('electron');
const FileIcons = require('file-icons-js');

module.exports={

    readFolder: function (path) { //render the files in the path    
        dir_path=path.replace(/%20/g,' '); //add the spaces in path
        window.current=dir_path;
        window.tagmodedisplayed=false;
        fs.readdir(dir_path, (err, files) => {
            'use strict';
            if (err) throw  err;
            document.getElementById('listed-folders').innerHTML = `<ol class="list-group list-group-flush" id="display-folders"></ol>`;
            document.getElementById('listed-files').innerHTML = `<ol class="list-group list-group-flush" id="display-files"></ol>`;
            files.sort();
            for (let file of files) {
            try{
                fs.stat(dir_path + file, (err, stats) => {
                    let ID =(dir_path+file+'\\').replace(/ /g,'%20'); //remove space in path
                    try{
                    if (stats.isDirectory()) { //render folders
                        document.getElementById('display-folders').innerHTML += `<li class="list-group-item list-group-item-action" id=${ID} style="cursor:pointer" onclick="foldernav.readFolder(this.id)"><span class="fa fa-folder-open" style="color:#006dcc"></span> ${file}</li>`;
                    }
                    else { //render files
                        var filetype=FileIcons.getClassWithColor(file);
                        document.getElementById('display-files').innerHTML += `<li class="list-group-item list-group-item-action" id=${ID} style="cursor:pointer" ondblclick="foldernav.openFile(this.id)"><span class="${filetype}"></span> ${file}</li>`;
                    }}catch{}
                });
            }catch{continue;}
            }
        });
    },

    openFile: function (path) {
        dir_path=path.replace(/%20/g,' ')+'\\';
        shell.openItem(dir_path);
    }

};