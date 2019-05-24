let dir;
let dir_path;
var current='D:\\';
var tagmodedisplayed=false;

foldernav.readFolder('D:\\');
db.createDatabase();
shortcuts.showRecent();
tagop.showTagList();

document.getElementById('seldir').addEventListener('input', _ => {
    dir_path=dir.files[0].path+'\\';
    console.log(dir_path);
    db.addRecentDir(dir_path); //add selected directory to recent list
    shortcuts.showRecent();
    foldernav.readFolder(dir_path);
})

document.getElementById('fxbtn').addEventListener('click', _ => {
    dir=document.getElementById('seldir');
    dir.click();
})

document.getElementById('home').addEventListener('click', _ => {
    foldernav.readFolder('D:\\');
})

document.getElementById('createtag').addEventListener('click', _ => {
    tagop.createTag();
})

document.getElementById('deletetag').addEventListener('click', _ => {
    tagop.deleteTag();
})

document.getElementById('tagmode').addEventListener('click', _ => {
    if(tagmodedisplayed){
        foldernav.readFolder(current);
    }else{
        tagmode.renderFiles(current);
    }
})

document.getElementById('back').addEventListener('click', _ => {
    foldernav.readFolder(path.dirname(current)+'\\');
})

window.onclick = function(event) {
    if (!event.target.matches('#dd-toggle') && !event.target.matches('#searchbox')) {
        var dropdown = document.getElementById("tagdropdown");
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
}