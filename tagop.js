module.exports={
    showTagList: async function(){
        var tagList=await db.getTagList();
        document.getElementById('quick-access').innerHTML += `<br>`;
        for (let tag of tagList) {
            let ID=tag.replace(/ /g,'%20');
            document.getElementById('quick-access').innerHTML +=`<span id=${ID} class="badge badge-pill badge-info"  style="cursor:pointer" onclick="tagop.getTagged(this.id)">${tag}</span>`;
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
            }).then((tag) => {
                 if(tag === null) {
                 console.log('user cancelled');
                 } else {
                      db.createTag(tag);
                      dialog.showMessageBox({buttons:["OK"], message:"Tag added successfully",title:"UManager",type:"info"});
                 }
            }).catch(console.error);
    },

    getTagged:async function(tag){
        var tagged= await db.getTagged(tag.replace(/%20/g,' '))
        console.log(tagged)
        document.getElementById('listed-folders').innerHTML = `<ul class="list-group list-group-flush" id="display-folders"></ul>`;
        document.getElementById('listed-files').innerHTML = `<ul class="list-group list-group-flush" id="display-files"></ul>`;
        for(value of tagged){
            file=value.filename;
            ID=value.filepath;
            document.getElementById('display-files').innerHTML += `<li class="list-group-item list-group-item-action" id=${ID} style="cursor:pointer" ondblclick="foldernav.openFile(this.id)"><i class="fa fa-file"></i> ${file}</li>`
        }
    }


}