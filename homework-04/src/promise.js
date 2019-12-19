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
// let one;
// let two;

async function dice() {
  console.log(`Data is ${Date.now()} start`);

  delay(() => {
    throwDice(() => {
      delay(() => {
        throwDice(() => {
          console.log();
        });
      });
    });
  })
    .then((res) => {
      return res;
    })
    .then((res) => {
      return res;
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
  // throwDice().then((res) => {
  //   one = res;
  //   delay(() => {
  //     console.log(`Date is ${Date.now()}, number one ${res}`);
  //   }, 700);
  // });
  // throwDice().then((res) => {
  //   two = res;
  //   delay(() => {
  //     console.log(`Date is ${Date.now()}, number two ${res}`);
  //   }, 2000);
  // });
  // delay(() => {
  //   console.log(`Data is ${Date.now()} sum: ${one + two}`);
  // }, 3000);
}
dice();
