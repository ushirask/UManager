module.exports={

    showRecent: async function(){
        var recentList=await db.getRecentDirs();
        document.getElementById('quick-access').innerHTML=`<ul class="list-group " id="shortcuts"></ul>`;
        for (let dir of recentList) {
            let ID=(dir+'\\').replace(/ /g,'%20');
            document.getElementById('shortcuts').innerHTML += `<li id=${ID} class="list-group-item list-group-item-action" style="cursor:pointer" onclick="foldernav.readFolder(this.id)"><i class="fa fa-folder-open"></i> ${dir}</li>`;
        }
    }

}