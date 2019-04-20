module.exports={
    
    deletefile : function(filepath){
        var path=filepath.replace(/%20/g,' ')+'\\';
        let options  = {
            buttons: ["Delete","Cancel"],
            type: 'question',
            title: "Confirm Delete",
            message: "Are you sure you want to delete this file?"
        };

        dialog.showMessageBox(options, (response) => {
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

}