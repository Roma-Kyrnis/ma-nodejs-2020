const { task1: sum, task2: earth, task3 } = require('./tasks');

async function boot() {
  console.log(sum());
  console.log(await task3);
  (() => {
    earth.addDiameterAndCalculateVolume(10);
    earth.printedNameAndVolume();
  })();
}

boot();
