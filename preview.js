const fs = require('fs')
const genThumbnail = require('simple-thumbnail')

// promise
genThumbnail('a.jpg', 'path.png','240x240')
  .then(() => console.log('done!'))
  .catch(err => console.error(err,"------------------------------------"))