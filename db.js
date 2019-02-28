module.exports={
    createDatabase: function(){
        const request = window.indexedDB.open("UManagerDB", 1);

    request.onupgradeneeded = event => {
        const db = event.target.result;
        
        const fileStore = db.createObjectStore(
            "files",
            { autoIncrement: true }
        );
        fileStore.createIndex("pathIndex","filepath");        
    };
    },

    addData: function(filepath,filename,tags){
        const request = window.indexedDB.open("UManagerDB", 1);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(
                "files",
                "readwrite"
            );
            const fileStore = transaction.objectStore("files");
        
            fileStore.add(
                { filepath: filepath, filename: filename, tags: tags }
            );

            transaction.oncomplete = () => {
                db.close();
            };
        };
    }
}