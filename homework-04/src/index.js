function throwDice() {
  return Math.round(1 + Math.random() * 5);
}
let one;
let two;

function dice() {
  console.log('start');
  setImmediate(() => {
    one = throwDice();
    console.log(`one: ${one}`);
  }, 700);
  setImmediate(() => {
    two = throwDice();
    console.log(`two: ${two}`);
  }, 2000);
  setImmediate(() => {
    console.log(one + two);
  }, 3000);
}
dice();
