const os = require('os');

let rateInput;
let limitInput;
let colorInput;
let totalMem;
let freeMem;
let allocatedMem;
let delta;
let colorDelta = '%s';
let colorAttention = '%s';

process.argv.forEach((element) => {
  const [, value] = element.split('=');
  if (/^RATE=\d+$/.test(element)) rateInput = value;
  if (/^LIMIT=\d+$/.test(element)) limitInput = value;
  if (/^COLOR=(true|false)$/.test(element)) colorInput = value;
});

function cliTool(rate = 10000, limit = 300, color = true) {
  console.clear();

  totalMem = Math.round(os.totalmem() / 1e6);
  freeMem = (os.freemem() / 1e6).toFixed(3);
  delta = (allocatedMem - totalMem - freeMem).toFixed(3);
  allocatedMem = (totalMem - freeMem).toFixed(3);

  if (color === true) {
    if (delta < 0) colorDelta = '\x1b[31m%s\x1b[0m';
    else colorDelta = '\x1b[32m%s\x1b[0m';
    if (Number(freeMem) < limit) colorAttention = '\x1b[31m%s\x1b[0m';
    else colorAttention = '\x1b[32m%s\x1b[0m';
  }

  console.log(`Total system memory: ${totalMem} MB`);
  console.log(`Free memory available: ${colorAttention} MB`, freeMem);
  console.log(`Allocated memory: ${allocatedMem} MB`);
  console.log(`Delta for previous allocated memory value: ${colorDelta} MB`, delta);

  if (Number(freeMem) < limit)
    console.log(colorAttention, '!!! ATTENTION: Available memory is under the defined limit !!!');
  console.log(Date.now());

  setTimeout(() => {
    cliTool(rateInput, limitInput, colorInput);
  }, rate);
}

cliTool(rateInput, limitInput, colorInput);
