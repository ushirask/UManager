module.exports={

    renderFiles: function (path) { //render the files in the path
        dir_path=path.replace(/%20/g,' '); //add the spaces in path
        window.tagmodedisplayed=true;
        fs.readdir(dir_path, (err, files) => {
            'use strict';
            if (err) throw  err;
            document.getElementById('listed-folders').innerHTML = `<ul class="list-group list-group-flush" id="display-folders"></ul><button id="tagSelected" type="button" class="btn btn-primary" onclick="tagmode.getSelected()">Tag Selected</button></ul>`;
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

    getSelected: async function(){
        FileList=document.getElementById('display-files').getElementsByClassName("list-group-item list-group-item-action active");
        var tagList=await db.getTagList();
        prompt({
            title: 'Add Tags',
            label: 'Tag Name:',
            type: 'select',
            height: 160,
            selectOptions: tagList
            }).then((tag) => {
                 if(tag === null) {
                 } else {
                      Array.prototype.forEach.call(FileList, a => {
                        db.addTagData(a.id,a.innerText,tagList[tag]);
                      });
                      dialog.showMessageBox({buttons:["OK"], message:"Tags added successfully",title:"UManager",type:"info"});
                      tagmode.renderFiles(current);
                 }
        }).catch(console.error);
        
    }
}