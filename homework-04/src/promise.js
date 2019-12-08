function throwDice() {
  return new Promise((resolve, reject) => {
    const result = Math.round(0 + Math.random() * 5);
    if (result === 0) reject(new Error('Lost dice'));
    else resolve(result);
  });
}
function delay(callback, ms) {
  return new Promise(() => {
    setTimeout(() => {
      callback();
    }, ms);
  });
}
let one;
let two;

async function dice() {
  console.log(`Data is ${Date.now()} start`);
  throwDice()
    .then((res) => {
      throwDice()
        .then(() => {
          one = res;
          return res;
        })
        .catch((err) => {
          return new Error(`In one: ${err}`);
        });
      delay(() => {
        console.log(`Date is ${Date.now()}, number one ${res}`);
      }, 700);
    })
    .then(() => {
      throwDice().then((res) => {
        throwDice()
          .then(() => {
            two = res;
            return res;
          })
          .catch((err) => {
            return new Error(`In two: ${err}`);
          });
        delay(() => {
          console.log(`Date is ${Date.now()}, number two ${res}`);
        }, 2000);
      });
    })
    .then(() => {
      delay(() => {
        console.log(`Data is ${Date.now()} sum: ${one + two}`);
      }, 3000);
    })
    .catch((err) => {
      console.error(`${err}`);
      return new Error(`${err}`);
    });
}
dice();
