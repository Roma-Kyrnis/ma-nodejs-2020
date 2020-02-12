const os = require('os');

let rateInput = 1000;
let limitInput = 300;
let colorInput = true;
let allocatedMem;

process.argv.forEach((element) => {
  const [key, value] = element.split('=');
  const parsedValue = parseFloat(value);
  if (/^RATE=\d+$/.test(element) || (key === '--rate' && /^\d+$/.test(value)))
    rateInput = parsedValue;
  if (/^LIMIT=\d+$/.test(element) || (key === '--limit' && /^\d+$/.test(value)))
    limitInput = parsedValue;
  if (/^COLOR=(true|false)$/.test(element) || (key === '--color' && /^(true|false)$/.test(value))) {
    if (value === 'true') colorInput = true;
    else colorInput = false;
  }
});

function cliTool(rate, limit, color) {
  console.clear();

  let colorDelta = '%s';
  let colorAttention = '%s';
  const totalMem = Math.round(os.totalmem() / 1e6);
  const freeMem = os.freemem() / 1e6;
  const delta = allocatedMem - totalMem - freeMem;
  allocatedMem = totalMem - freeMem;

  if (color) {
    if (delta < 0) colorDelta = '\x1b[31m%s\x1b[0m';
    else colorDelta = '\x1b[32m%s\x1b[0m';
    if (freeMem < limit) colorAttention = '\x1b[31m%s\x1b[0m';
  }

  console.log(`Total system memory: ${totalMem} MB`);
  console.log(`Free memory available: ${colorAttention} MB`, freeMem.toFixed(3));
  console.log(`Allocated memory: ${allocatedMem.toFixed(3)} MB`);
  console.log(`Delta for previous allocated memory value: ${colorDelta} MB`, delta.toFixed(3));

  if (freeMem < limit)
    console.log(colorAttention, '!!! ATTENTION: Available memory is under the defined limit !!!');

  setTimeout(() => {
    cliTool(rateInput, limitInput, colorInput);
  }, rate);
}

cliTool(rateInput, limitInput, colorInput);
