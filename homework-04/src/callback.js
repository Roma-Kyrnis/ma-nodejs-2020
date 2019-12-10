function throwDice(callback) {
  const res = Math.round(0 + Math.random() * 5);
  if (res === 0) throw new Error('Lost dice');
  return callback(res);
}
let one;
let two;

function dice() {
  console.log(`Data is ${Date.now()} start`);
  setTimeout(() => {
    one = throwDice((res) => {
      console.log(`Data is ${Date.now()} number one: ${res}`);
      return res;
    });
    setTimeout(() => {
      two = throwDice((res) => {
        console.log(`Data is ${Date.now()} number two: ${res}`);
        return res;
      });
      setTimeout(() => {
        console.log(`Data is ${Date.now()} sum: ${one + two}`);
      }, 1000);
      return 0;
    }, 1300);
    return 0;
  }, 700);
}
dice();
