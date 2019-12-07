function throwDice(callback) {
  return new Promise((resolve, reject) => {
    const result = Math.round(0 + Math.random() * 5);
    if (result !== 0) resolve(result);
    else {
      const err = 'Lost dice';
      reject(err);
    }
    callback();
  });
}
let one;
let two;

function dice() {
  console.log(`Data is ${Date.now()} start`);
  setTimeout(() => {
    throwDice(
      setTimeout(() => {
        throwDice(
          setTimeout(() => {
            throwDice();
          }, 1000),
        );
      }, 1300),
    );
  }, 700);
  Promise.all()
    .then(
      (result) => {
        one = result;
        console.log(`Data is ${Date.now()} number one: ${one}`);
      },
      (error) => {
        return new Error(console.error(`${error}`));
      },
    )
    .then(
      (result) => {
        two = result;
        console.log(`Data is ${Date.now()} number two: ${two}`);
      },
      (error) => {
        return new Error(console.error(`${error}`));
      },
    )
    .then(() => console.log(`Data is ${Date.now()} sum: ${one + two}`));
}
dice();
