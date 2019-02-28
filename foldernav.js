const fs = require('fs');
const {shell} = require('electron');

module.exports={
    readFolder: function (path) {
        dir_path=path.replace(/%20/g,' ');
        window.current=dir_path;
        console.log(current);
        fs.readdir(dir_path, (err, files) => {
            'use strict';
            if (err) throw  err;
            document.getElementById('listed-files').innerHTML = `<ul class="list-group list-group-flush" id="display-folders"></ul><ul class="list-group list-group-flush" id="display-files"></ul>`;
            for (let file of files) {
                fs.stat(dir_path + file, (err, stats) => {
                    let theID =(dir_path+file+'\\').replace(/ /g,'%20');
                    if (err) throw err;
                    if (stats.isDirectory()) {
                        document.getElementById('display-folders').innerHTML += `<li class="list-group-item list-group-item-action" id=${theID} style="cursor:pointer" onclick="foldernav.readFolder(this.id)"><i class="fa fa-folder-open"></i> ${file}</li>`;
                    }
                    else {
                        document.getElementById('display-files').innerHTML += `<li class="list-group-item list-group-item-action" id=${theID} style="cursor:pointer" ondblclick="foldernav.openFile(this.id)"><i class="fa fa-file"></i> ${file}</li>`;
                    }
                });
            }
        });
    },

    openFile: function (path) {
        dir_path=path.replace(/%20/g,' ')+'\\';
        shell.openItem(dir_path);
    }

};