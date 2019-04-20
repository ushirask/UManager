module.exports={

    createDatabase: function(){
        const request = window.indexedDB.open("UManagerDB", 1);

        request.onupgradeneeded = event => { //create new database if not already exists
            const db = event.target.result;
            
            //tagged files
            const fileStore = db.createObjectStore(
                "files",
                { autoIncrement: true }
            );
            fileStore.createIndex("pathIndex","filepath");        
            fileStore.createIndex("tagIndex","tag");

            //recently opened directories
            const recentStore=db.createObjectStore(
                "recent",
                { autoIncrement: true }
            );
            
            //tags
            const tagStore=db.createObjectStore(
                "tags",
                {keyPath:"tag"}
            );

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

    createTag: function(tag){
        const request = window.indexedDB.open("UManagerDB", 1);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(
                "tags",
                "readwrite"
            );
            const tagStore = transaction.objectStore("tags");
            tagStore.add(
                { tag: tag }
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

    getRecentDirs: function(){
        return new Promise((resolve,reject) => {
            const request = window.indexedDB.open("UManagerDB", 1);
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(
                    "recent",
                    "readwrite"
                );
                const recentStore = transaction.objectStore("recent");

                var quicknav=[];
                recentStore.openCursor(null,'prev').onsuccess = function(event) {
                    var cursor = event.target.result;
                    if((cursor) && (quicknav.length<5)) {
                      if(!quicknav.includes(cursor.value.dirpath))
                      quicknav.push(cursor.value.dirpath);
                      cursor.continue();
                    } else {
                      resolve(quicknav);
                    }
                };

                transaction.oncomplete = () => {
                    db.close();
                };
            };
        });
    },

    getTagged: function(tag){
        return new Promise((resolve,reject) => {
            const request = window.indexedDB.open("UManagerDB", 1);
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(
                    "files",
                    "readonly"
                );
                const tagIndex = transaction.objectStore("files").index("tagIndex");
                const keyRange = IDBKeyRange.only(tag);
                var tagged=[];
                tagIndex.openCursor(keyRange).onsuccess = function(event) {
                    var cursor = event.target.result;
                    if(cursor) {
                      tagged.push(cursor.value);
                      cursor.continue();
                    } else {
                      resolve(tagged);
                    }
                };

                transaction.oncomplete = () => {
                    db.close();
                };
            };
        });
    },

    getTagList: function(){
        return new Promise((resolve,reject) => {
            const request = window.indexedDB.open("UManagerDB", 1);
            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(
                    "tags",
                    "readonly"
                );
                const tagStore= transaction.objectStore("tags");
                const tagList = tagStore.getAllKeys();
                
                tagList.onsuccess=() => {
                    resolve(tagList.result);
                }

                transaction.oncomplete = () => {
                    db.close();
                };
            };
        });
    },

    fileDeleteCleanUp: function(filepath){
        const request = window.indexedDB.open("UManagerDB", 1);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(
                "files",
                "readwrite"
            );
            const fileStore = transaction.objectStore("files");
            const pathIndex = fileStore.index("pathIndex");
        
            var del = pathIndex.openKeyCursor(IDBKeyRange.only(filepath)); 
            del.onsuccess = function() {
            var cursor = del.result;
            if (cursor) {
                fileStore.delete(cursor.primaryKey);
                cursor.continue;
            }
            }

            transaction.oncomplete = () => {
                db.close();
            };
        };
    }

}