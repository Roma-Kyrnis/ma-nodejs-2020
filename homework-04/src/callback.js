function throwDice(callback) {
  const res = Math.round(0 + Math.random() * 5);
  let err;
  if (res === 0) err = new Error('Lost dice');
  return callback(err, res);
}
let one;
let two;

function dice() {
  console.log(`Data is ${Date.now()} start`);
  setTimeout(() => {
    try {
      one = throwDice((err, res) => {
        if (err) throw new Error(err);
        return res;
      });
      console.log(`Data is ${Date.now()} number one: ${one}`);
    } catch (err) {
      return new Error(console.error(`${err}`));
    }
    setTimeout(() => {
      try {
        two = throwDice((err, res) => {
          if (err) throw new Error(err);
          return res;
        });
        console.log(`Data is ${Date.now()} number two: ${two}`);
      } catch (err) {
        return new Error(console.error(`${err}`));
      }
      setTimeout(() => {
        console.log(`Data is ${Date.now()} sum: ${one + two}`);
      }, 1000);
      return 0;
    }, 1300);
    return 0;
  }, 700);
}
dice();
