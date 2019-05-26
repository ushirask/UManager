const db = require('../database/db');
const chai = require('chai');
require("fake-indexeddb/auto");


describe('UManager database access tests', function () {
    
    before(() => {
      db.createDatabase();
     });
  
  
     after(() => {
        
     });

     it('DB is created & accessible',  function () {
      const request = indexedDB.open("UManagerDB", 1);
      var result=[];
      indexedDB.databases().then(r => result=r)
      request.onsuccess = function(event) {
        expected=[{ name: 'UManagerDB', version: 1 }];
        chai.assert.deepEqual(expected,result)
      };
    }); 


    it('Create new tag',  function () {
      db.createTag('test tag 1');
    }); 

    it('Get Tag List', async function () {
      tags=await db.getTagList()
      chai.assert(Array.isArray(tags),"tags is not an array")
      chai.assert.deepEqual(tags,['test tag 1']);
    });

    it('Tag file', function () {
      db.addTagData('filepath_x','filename_x','test tag 1')
    }); 

    it('Get Tagged files', async function () {
      tagged=await db.getTagged('test tag 1')
      expected=[ { filepath: 'filepath_x',
      filename: 'filename_x',
      tag: 'test tag 1' } ]
      chai.assert(Array.isArray(tagged),"tags is not an array")
      chai.assert.deepEqual(tagged,expected);
    });

    it('Add recent directory', async function () {
      db.addRecentDir('E:')
    });

    it('Get Tagged files', async function () {
      dirs=await db.getRecentDirs()
      expected=[ "E:"]
      chai.assert(Array.isArray(dirs),"tags is not an array")
      chai.assert.deepEqual(dirs,expected);
    });

  });