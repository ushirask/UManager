const { remote } = require('electron');

module.exports={
    showTagList: async function(){
        var tagList=await db.getTagList();
        var limitedTagList = tagList.slice(0, 5);
        document.getElementById('tags').innerHTML = ``;
        document.getElementById('fulltaglist').innerHTML= ``;
        for (let tag of limitedTagList) {
            let ID=tag.replace(/ /g,'%20');
            document.getElementById('tags').innerHTML +=`<span id=${ID} class="badge badge-pill badge-info"  style="cursor:pointer" onclick="tagop.getTagged(this.id)">${tag}</span>`;
        }
        for (let tag of tagList) {
            let ID=tag.replace(/ /g,'%20');
            document.getElementById('fulltaglist').innerHTML += `<a id=${ID} onclick="tagop.getTagged(this.id)">${tag}</a>`
        }

    },
    createTag:function(){
        prompt({
            title: 'Create New Tag',
            label: 'Tag Name:',
            type: 'input',
            height: 160,
            inputAttrs: {
                type: 'text',
                required: true
            }
            },remote.getCurrentWindow()).then((tag) => {
                 if(tag != null){
                      db.createTag(tag);
                      dialog.showMessageBox(remote.getCurrentWindow(),{buttons:["OK"], message:"Tag added successfully",title:"UManager",type:"info"});
                      tagop.showTagList();
                 }
            }).catch(console.error);
    },

    getTagged:async function(tag){
        var tagged= await db.getTagged(tag.replace(/%20/g,' '))
        //console.log(tagged)
        document.getElementById('listed-folders').innerHTML = `<ul class="list-group list-group-flush" id="display-folders"></ul>`;
        document.getElementById('listed-files').innerHTML = `<ul class="list-group list-group-flush" id="display-files"></ul>`;
        for(value of tagged){
            file=value.filename;
            ID=value.filepath;
            document.getElementById('display-files').innerHTML += `<li class="list-group-item list-group-item-action" id=${ID} style="cursor:pointer" ondblclick="foldernav.openFile(this.id)"><i class="fa fa-file"></i> ${file}</li>`
        }
    },

    deleteTag:async function(){
        var tagList=await db.getTagList();
        prompt({
        title: 'Delete Tag',
        label: 'Delete Tag:',
        type: 'select',
        height: 160,
        selectOptions: tagList
        },remote.getCurrentWindow()).then((tag) => {
            if(tag != null){
                db.tagDelete(tagList[tag]);
                dialog.showMessageBox(remote.getCurrentWindow(),{buttons:["OK"], message:"Tag deleted successfully",title:"UManager",type:"info"});
                tagop.showTagList();
            }
        }).catch(console.error);
        },


}