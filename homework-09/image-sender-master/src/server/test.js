/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const { pipeline, Transform } = require('stream');
const config = require('../config');

class SlowerTransform extends Transform {
  constructor(rate) {
    super({ highWaterMark: rate });
    this.length = 0;
    this.dots = 0;
  }

  _transform(chunk, encoding, next) {
    this.length += chunk.length;
    // console.log(this.length);
    if (this.length >= config.rate * (this.dots === 0 ? 1 : this.dots)) {
      // console.clear();
      for (let i = 0; i < this.dots; i++) process.stdout.write('.');
      console.log('\t');
      this.dots++;
    }
    this.push(chunk);
    setTimeout(() => {
      next();
    }, 1000);
  }
}

function main() {
  const readStream = fs.createReadStream(config.filePath);
  const writeStream = fs.createWriteStream('./createdImage.jpg');

  const slowerTransform = new SlowerTransform(config.rate);

  pipeline(readStream, slowerTransform, writeStream, err => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }
    console.log('OK. All is already sended!');
  });

  // fsp
  //   .readFile(config.filePath)
  //   .then(buffer => res.end(buffer))
  //   .catch(err => {
  //     console.error('Failed to send image buffer!', err.stack);
  //     res.emit('error', new Error('Failed to send image!'));
  //   });
}

main();
