module.exports={

    createDatabase: function(){
        const request = window.indexedDB.open("UManagerDB", 1);

    request.onupgradeneeded = event => { //create new database if not already exists
        const db = event.target.result;
        
        //tags
        const fileStore = db.createObjectStore(
            "files",
            { autoIncrement: true }
        );
        fileStore.createIndex("pathIndex","filepath");        
        fileStore.createIndex("tagIndex","tag");

        //recently opened directories
        const recentStore=db.createObjectStore(
            "recent",
            {keyPath:"dirpath"}
        )
    };
    },

    addTagData: function(filepath,filename,tag){
        const request = window.indexedDB.open("UManagerDB", 1);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(
                "files",
                "readwrite"
            );
            const fileStore = transaction.objectStore("files");
        
            fileStore.add(
                { filepath: filepath, filename: filename, tag: tag }
            );

            transaction.oncomplete = () => {
                db.close();
            };
        };
    },

    addRecentDir: function(dirpath){
        const request = window.indexedDB.open("UManagerDB", 1);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(
                "recent",
                "readwrite"
            );
            const recentStore = transaction.objectStore("recent");
        
            recentStore.add(
                { dirpath: dirpath }
            );

            transaction.oncomplete = () => {
                db.close();
            };
        };
    },

    getRecentDirs: function(dirpath){
        return new Promise((resolve,reject) => {
            const request = window.indexedDB.open("UManagerDB", 1);
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(
                    "recent",
                    "readwrite"
                );
                const recentStore = transaction.objectStore("recent");
                const getDirs = recentStore.getAllKeys();
                
                getDirs.onsuccess=() => {
                    resolve(getDirs.result);
                }

                transaction.oncomplete = () => {
                    db.close();
                };
            };
        });
    }
}