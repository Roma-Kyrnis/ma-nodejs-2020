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
  // console.log(`${Date.now()} One: ${one}`);

  delay(() => {
    console.log(`${Date.now()} Data is  start`);
    return throwDice();
  }, 0)
    .then((res) => {
      console.log(res);
      delay(() => {
        console.log(res);
        console.log(`Two: ${Date.now()}`);
      }, 1300);
    })
    .then(
      delay(() => {
        console.log(`Sum: ${Date.now()}`);
      }, 1000))
    .catch((err) => console.error(`In error: ${err}`));

  // delay(() => {
  //   throwDice(() => {
  //     delay(() => {
  //       throwDice(() => {
  //         console.log();
  //       });
  //     });
  //   });
  // })
  //   .then((res) => {
  //     return res;
  //   })
  //   .then((res) => {
  //     return res;
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => console.error(err));

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
