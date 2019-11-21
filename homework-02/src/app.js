const { sum, earth, task3 } = require('./task/index.js');

async function boot() {
  console.log(sum());
  await task3;
  (() => {
    earth.addDiameterAndCalculateVolume(10);
    earth.printedNameAndVolume();
  })();
}

boot();
