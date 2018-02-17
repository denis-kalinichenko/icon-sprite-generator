const Vinyl = require('vinyl');
const fs = require('fs');

const cleaner = require('./cleaner');

module.exports = function processFiles(files = []) {
  return new Promise((resolve, reject) => {
    if (!files.length) {
      reject(new Error('No files provided.'));
      return;
    }

    const collection = files.map((file) => {
      let content = fs.readFileSync(file).toString();
      content = cleaner(content);

      return new Vinyl({
        path: file,
        contents: Buffer.from(content, 'utf-8'),
      });
    });

    resolve(collection);
  });
};
