const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

const inputDir = path.join(process.cwd(), inputDirName); // absolute path to input dir
const outputFile = path.join(process.cwd(), outputDirName, outputFileName); // absolute path to output file

async function getInputFileList() {
  let files;
  try {
    files = await fsp.readdir(inputDirName);
  } catch (err) {
    return new Error(console.error(`Error in getInputFileList: ${err}`));
  }
  return files.map((file) => path.join(inputDir, file));
}

async function getObjectFromFile(filePath) {
  let compressedBuffer;
  let jsonBuffer;
  try {
    compressedBuffer = await fsp.readFile(filePath); // read file to buffer
  } catch (err) {
    return new Error(console.error(`Error in getInputFileList: ${err}`));
  }
  try {
    jsonBuffer = await gunzip(compressedBuffer); // decompress buffer with gunzip
  } catch (err) {
    return new Error(console.error(`Error in getInputFileList: ${err}`));
  }
  const json = jsonBuffer.toString(); // convert buffer to JSON string
  const object = JSON.parse(json); // parse JSON string to object
  return object;
}

function rebuildUrl(originalUrl) {
  const address = new URL(originalUrl);
  const parse = path.parse(address.pathname);
  address.protocol = 'https';
  address.pathname = '/devices';
  address.search = `file=${parse.name}&type=${parse.ext}`;
  return address.href;
  // Change protocol, path, search string of URL
  // use URL class
  // Example:
  // from URL: http://example.com/files/devices/keyboards.xls
  // to URL: https://example.com/devices?file=keyboards&type=.xls
}

async function buildOutputObject(files) {
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    let object;
    try {
      // eslint-disable-next-line no-await-in-loop
      object = await getObjectFromFile(file); // get content with getObjectFromFile() function
    } catch (err) {
      return new Error(console.error(`Error in getInputFileList: ${err}`));
    }
    object.url = rebuildUrl(object.url); // update "url" field with rebuildUrl() function
    const name = path.basename(file.toLowerCase(), '.json.gz'); // get category name from file name
    result[name] = object; // assign category to result object (list of devices)
  }
  return result;
}

async function saveOutput(object) {
  const json = JSON.stringify(object, null, '  '); // stringify object to JSON string
  const bufferJson = Buffer.from(json); // create buffer from string
  let result;
  try {
    result = await gzip(bufferJson); // compress buffer with gzip
  } catch (err) {
    return new Error(console.error(`Error in getInputFileList: ${err}`));
  }
  try {
    await fsp.writeFile(outputFile, result, (err) => console.error(`Error in writeFile: ${err}`)); // write compressed buffer to file 'output/result.json.gz' (use constants)
  } catch (err) {
    return new Error(console.error(`Error in getInputFileList: ${err}`));
  }
  return 0;
}

async function start() {
  let inputFiles;
  let outputObject;
  try {
    inputFiles = await getInputFileList();
  } catch (err) {
    return new Error(console.error(`Error in getInputFileList: ${err}`));
  }
  try {
    outputObject = await buildOutputObject(inputFiles);
  } catch (err) {
    return new Error(console.error(`Error in getInputFileList: ${err}`));
  }
  try {
    await saveOutput(outputObject);
  } catch (err) {
    return new Error(console.error(`Error in getInputFileList: ${err}`));
  }
  return 0;
}
start().catch((err) => console.error('🐞  🤪  🐛\n', err));
