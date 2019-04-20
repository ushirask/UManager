module.exports={

    showRecent: async function(){
        var recentList=await db.getRecentDirs();
        console.log(recentList);
        document.getElementById('quick-access').innerHTML=``;
        for (let dir of recentList) {
            let ID=(dir+'\\').replace(/ /g,'%20');
            document.getElementById('quick-access').innerHTML += `<li id=${ID} style="cursor:pointer" onclick="foldernav.readFolder(this.id)"><i class="fa fa-folder-open"></i> ${dir}</li>`;
        }
    }

}