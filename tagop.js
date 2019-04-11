module.exports={
    showTagList: async function(){
        var tagList=await db.getTagList();
        document.getElementById('quick-access').innerHTML += `<br>`;
        for (let tag of tagList) {
            let ID=(JSON.stringify(tag)).replace(/ /g,'%20');
            document.getElementById('quick-access').innerHTML +=`<span id=${ID} class="badge badge-pill badge-info"  style="cursor:pointer" onclick="foldernav.openFile(this.id)">${tag}</span>`;
        }
    },
    createTag:function(){
        prompt({
            title: 'Create New Tag',
            label: 'Tag Name:',
            type: 'input',
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
    }


}