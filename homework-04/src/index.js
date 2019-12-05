// const path = require('path');
// const fsp = require('fs').promises;
// const zlib = require('zlib');
// const { promisify } = require('util');

// const gunzip = promisify(zlib.gunzip);
// const gzip = promisify(zlib.gzip);

// const inputDirName = 'input';
// const outputDirName = 'output';
// const outputFileName = 'result.json.gz';

// const inputDir // absolute path to input dir
// const outputFile // absolute path to output file

// async function getInputFileList() {
//   try {
//     const dir = await fsp.readdir(inputDirName);
//   } catch (err) {
//     console.error(`Error: ${err}`);
 //  }
  // read directory content - get list of filenames
  // create absolute path to each filename
// }

// async function getObjectFromFile(filePath) {
  // read file to buffer
  // decompress buffer with gunzip
  // convert buffer to JSON string
  // parse JSON string to object
// }

// function rebuildUrl(originalUrl) {
  // Change protocol, path, search string of URL
  // use URL class
  // Example:
  // from URL: http://example.com/files/devices/keyboards.xls
  // to URL: https://example.com/devices?file=keyboards&type=.xls
// }

// async function buildOutputObject(files) {
  // for each file:
  // get content with getObjectFromFile() function
  // update "url" field with rebuildUrl() function
  // get category name from file name
// assign category to result object (list of devices)
// }

// async function saveOutput(object) {
// stringify object to JSON string
// create buffer from string
// compress buffer with gzip
// write compressed buffer to file 'output/result.json.gz' (use constants)
// }

// async function start() {
//   await getInputFileList();
// const inputFiles = await getInputFileList();
// const outputObject = await buildOutputObject(inputFiles);
// await saveOutput(outputObject);
// }
// start().catch((err) => console.error('🐞  🤪  🐛\n', err));
