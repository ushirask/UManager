module.exports={

    renderFiles: function (path) { //render the files in the path
        dir_path=path.replace(/%20/g,' '); //add the spaces in path
        fs.readdir(dir_path, (err, files) => {
            'use strict';
            if (err) throw  err;
            document.getElementById('listed-folders').innerHTML = `<ul class="list-group list-group-flush" id="display-folders"></ul>`;
            document.getElementById('listed-files').innerHTML = `<ul class="list-group list-group-flush" id="display-files"></ul>`;
            for (let file of files) {
                fs.stat(dir_path + file, (err, stats) => {
                    let ID =(dir_path+file+'\\').replace(/ /g,'%20'); //remove space in path
                    if (err) throw err;
                    if (!stats.isDirectory()) { //render files
                        document.getElementById('display-files').innerHTML += `<li class="list-group-item list-group-item-action" id=${ID} style="cursor:pointer" onclick="tagmode.clickFile(this.id)"><i class="fa fa-file"></i> ${file}</li>`;
                    }
                });
            }
        });
    },

    clickFile: function(id){
        file=document.getElementById(id);
        if(file.className==="list-group-item list-group-item-action"){
            file.className="list-group-item list-group-item-action active";
        }else{
            file.className="list-group-item list-group-item-action";
        }
    },

    getSelected: function(){
        return document.getElementById('display-files').getElementsByClassName("list-group-item list-group-item-action active");
    }
}