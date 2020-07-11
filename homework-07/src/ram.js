const os = require('os');

let limitInput = 300;
let totalMem;
let freeMem;
let allocatedMem;

const body = {};

function cliTool() {
  totalMem = Math.round(os.totalmem() / 1e6);
  freeMem = (os.freemem() / 1e6).toFixed(3);
  allocatedMem = (totalMem - freeMem).toFixed(3);

  if (freeMem >= limitInput) body.message = 'OK';
  else body.message = '!!! ATTENTION: Available memory is under the defined limit !!!';

  body.total = totalMem;
  body.free = freeMem;
  body.allocated = allocatedMem;

  return body;
}

function setLimit(limit) {
  limitInput = limit;
  return `Minimum free memory limit is successfully set to ${limit} MB`;
}

module.exports = {
  setLimit,
  cliTool,
};
