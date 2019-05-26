const { remote } = require('electron');
const FileIcons = require('file-icons-js');

module.exports={

    renderFiles: function (path) { //render the files in the path
        dir_path=path.replace(/%20/g,' '); //add the spaces in path
        window.tagmodedisplayed=true;
        fs.readdir(dir_path, (err, files) => {
            'use strict';
            if (err) throw  err;
            document.getElementById('listed-folders').innerHTML = `<ol class="list-group list-group-flush" id="display-folders"></ol><button id="tagSelected" type="button" class="btn btn-primary" onclick="tagmode.getSelected()">Tag Selected</button>`;
            document.getElementById('listed-files').innerHTML = `<ol class="list-group list-group-flush" id="display-files"></ol>`;
            for (let file of files) {
                fs.stat(dir_path + file, (err, stats) => {
                    if (!stats.isDirectory()) { //render files
                        var filetype=FileIcons.getClassWithColor(file);
                        let ID =(dir_path+file+'\\').replace(/ /g,'%20'); //remove space in path
                        if (err) throw err;
                        document.getElementById('display-files').innerHTML += `<li class="list-group-item list-group-item-action" id=${ID} style="cursor:pointer" onclick="tagmode.clickFile(this.id)"><span class=${filetype}></span> ${file}</li>`;
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

    getSelected: async function(){
        FileList=document.getElementById('display-files').getElementsByClassName("list-group-item list-group-item-action active");
        var tagList=await db.getTagList();
        if(FileList.length){
            prompt({
                title: 'Add Tags',
                label: 'Tag Name:',
                type: 'select',
                height: 160,
                selectOptions: tagList
                },remote.getCurrentWindow()).then((tag) => {
                    if(tag === null) {
                    } else {
                        Array.prototype.forEach.call(FileList, a => {
                            db.addTagData(a.id,a.innerText,tagList[tag]);
                        });
                        dialog.showMessageBox({buttons:["OK"], message:"Tags added successfully",title:"UManager",type:"info"});
                        tagmode.renderFiles(current);
                    }
            }).catch(console.error);
        }else{
            dialog.showMessageBox({buttons:["OK"], message:"No files selected for tagging",title:"UManager",type:"info"});
        }
        
    }
}