module.exports={

    showRecent: async function(){
        var recentList=await db.getRecentDirs();
        console.log(recentList);
        for (let dir of recentList) {
            console.log(dir);
            let ID=(dir+'\\').replace(/ /g,'%20');
            document.getElementById('quick-access').innerHTML += `<li id=${ID} style="cursor:pointer" onclick="foldernav.readFolder(this.id)"><i class="fa fa-folder-open"></i> ${dir}</li>`;
        }
    }

}