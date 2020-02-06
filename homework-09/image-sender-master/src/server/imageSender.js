/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const { pipeline, Transform } = require('stream');
const config = require('../config');
const { endResponse } = require('./helpers');

const limitSpeed = config.rate >= config.limitRate ? config.rate : config.limitRate;

class SlowerTransform extends Transform {
  constructor() {
    super();
    this.length = 0;
    this.dots = 0;
  }

  _transform(chunk, encoding, next) {
    this.length += chunk.length;
    if (this.length >= limitSpeed * (this.dots === 0 ? 1 : this.dots)) {
      process.stdout.write('.');
      this.dots++;
    }
    this.push(chunk);
    setTimeout(() => {
      next();
    }, 1000);
  }
}

function sendJPEG(res) {
  const readStream = fs.createReadStream(config.filePath, {
    highWaterMark: limitSpeed,
  });

  readStream.on('error', () => {
    endResponse(res, 500);
  });

  const slowerTransform = new SlowerTransform(config.rate);

  pipeline(readStream, slowerTransform, res, err => {
    if (err) {
      console.error('Failed to send image buffer!', err.stack);
      res.emit('error', new Error('Failed to send image!'));
      return;
    }
    console.log('\tOK. All is already sended!');
  });
}

module.exports = {
  sendJPEG,
};
