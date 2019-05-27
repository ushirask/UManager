const db = require('../database/db');
const chai = require('chai');
require("fake-indexeddb/auto");


describe('Create Database', function () {
    
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
  });


describe("Create Tag",function(){
  it('Create simple tag',  function () {
    db.createTag('test');
  }); 

  it('Create tag with spaces',  function () {
    db.createTag('test tag');
  }); 

  it('Create same tag',  function () {
    db.createTag('test tag');
  }); 

});

describe("Get Tags",function(){
  it('Tag list is retrieved', async function () {
    tags=await db.getTagList()
    chai.assert(Array.isArray(tags),"tags is not an array")
  });
  it('No repeated tags', async function () {
    chai.assert.deepEqual(tags,['test','test tag']);
  });
});

describe("Tag File",function(){
  it('Tag file with simple tag', function () {
    db.addTagData('filepath_x','filename_x','test')
  }); 
  it('Tag file with tag with spaces', function () {
    db.addTagData('filepath_y','filename_y','test tag')
  }); 
});

describe("Get tagged files",function(){
  it('Simple tagged file list is retrieved', async function () {
    tagged1=await db.getTagged('test')
    chai.assert(Array.isArray(tagged1),"tags is not an array")
  });
  it('Spaced tagged file list is retrieved', async function () {
    tagged2=await db.getTagged('test tag')
    chai.assert(Array.isArray(tagged1),"tags is not an array")
  });

  it('Simple tagged file list is correct', async function () {
    expected1=[ { filepath: 'filepath_x',
    filename: 'filename_x',
    tag: 'test' } ]
    chai.assert.deepEqual(tagged1,expected1);
  });

  it('Spaced tagged file list is correct', async function () {
    expected2=[ { filepath: 'filepath_y',
    filename: 'filename_y',
    tag: 'test tag' } ]
    chai.assert.deepEqual(tagged2,expected2);
  });
});

describe("Add Recent Directory",function(){
  it('Add recent directory', async function () {
    db.addRecentDir('E:')
  });
});

describe("Get Recent Directories",function(){
  it('Retrieves recent directories', async function () {
    dirs=await db.getRecentDirs()
    expected=[ "E:"]
    chai.assert(Array.isArray(dirs),"recent is not an array")
    chai.assert.deepEqual(dirs,expected);
  });
});