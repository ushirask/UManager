const {shell} = require('electron');

module.exports={

    readFolder: function (path) { //render the files in the path
        dir_path=path.replace(/%20/g,' '); //add the spaces in path
        window.current=dir_path;
        console.log(current);
        fs.readdir(dir_path, (err, files) => {
            'use strict';
            if (err) throw  err;
            document.getElementById('listed-folders').innerHTML = `<ul class="list-group list-group-flush" id="display-folders"></ul>`;
            document.getElementById('listed-files').innerHTML = `<ul class="list-group list-group-flush" id="display-files"></ul>`;
            for (let file of files) {
                fs.stat(dir_path + file, (err, stats) => {
                    let ID =(dir_path+file+'\\').replace(/ /g,'%20'); //remove space in path
                    if (err) throw err;
                    if (stats.isDirectory()) { //render folders
                        document.getElementById('display-folders').innerHTML += `<li class="list-group-item list-group-item-action" id=${ID} style="cursor:pointer" onclick="foldernav.readFolder(this.id)"><i class="fa fa-folder-open"></i> ${file}</li>`;
                    }
                    else { //render files
                        document.getElementById('display-files').innerHTML += `<li class="list-group-item list-group-item-action" id=${ID} style="cursor:pointer" ondblclick="foldernav.openFile(this.id)"><i class="fa fa-file"></i> ${file}</li>`;
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