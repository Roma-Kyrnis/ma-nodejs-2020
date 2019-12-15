const os = require('os');

let totalMem;
let freeMem;
let allocatedMem;
let delta;

function cliTool(rate = 1000, limit = 300) {
  // color = true
  console.clear();
  totalMem = Math.round(os.totalmem() / 1e6);
  freeMem = (os.freemem() / 1e6).toFixed(3);
  delta = (allocatedMem - totalMem - freeMem).toFixed(3);
  allocatedMem = (totalMem - freeMem).toFixed(3);

  console.log(`Total system memory: ${totalMem} MB`);

  console.log(`Free memory available: ${freeMem} MB`);

  console.log(`Allocated memory: ${allocatedMem} MB`);

  console.log(`Delta for previous allocated memory value: ${delta} MB`);

  if (freeMem < limit)
    console.log('!!! ATTENTION: Available memory is under the defined limit !!!');

  setTimeout(() => {
    cliTool();
  }, rate);
}

cliTool();
