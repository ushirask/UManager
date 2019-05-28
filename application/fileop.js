const { remote } = require('electron');

module.exports={
    
    deletefile : function(filepath){
        var path=filepath.replace(/%20/g,' ')+'\\';
        let options  = {
            buttons: ["Delete","Cancel"],
            type: 'warning',
            title: "Confirm Delete",
            message: "Are you sure you want to delete this file?"
        };

        dialog.showMessageBox(remote.getCurrentWindow(),options, (response) => {
            if (response === 0)
            fs.unlink(path, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                db.fileDeleteCleanUp(filepath);
                dialog.showMessageBox({buttons:["OK"], message:"File Deleted successfully",title:"UManager",type:"info"});
                foldernav.readFolder(current);
            }); 
        });
    },

    showdetails : function(filepath){
        var path=filepath.replace(/%20/g,' ')+'\\';


        fs.stat(path, (err, stats) => {
                var displaypath=path.replace(/\\\\/g,'\\');
                var filesize="File size : "+stats.size+' Bytes';
                var created="Created : "+stats.birthtime.toLocaleString();
                var modified="Modified : "+stats.mtime.toLocaleString();
                var accessed="Accessed : "+stats.atime.toLocaleString();
                infomessage="Path : "+displaypath+'\n'+filesize+'\n'+created+'\n'+modified+'\n'+accessed;
                let options  = {
                    buttons: ["Close"],
                    type: 'info',
                    title: "File Info",
                    message: infomessage
                };
                dialog.showMessageBox(remote.getCurrentWindow(),options);
            
        });

        
    }

}