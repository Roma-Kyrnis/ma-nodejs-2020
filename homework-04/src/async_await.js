function throwDice(ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      const res = Math.round(0 + Math.random() * 5);
      resolve(res);
    }, ms),
  );
}
async function dice() {
  let one;
  let two;
  console.log(`Data is ${Date.now()} start`);
  try {
    one = await throwDice(700);
    if (one === 0) throw new Error('Lost dice');
    else console.log(`Data is ${Date.now()} number one: ${one}`);
  } catch (err) {
    return new Error(console.error(`${err}`));
  }
  try {
    two = await throwDice(1300);
    if (two === 0) throw new Error('Lost dice');
    else console.log(`Data is ${Date.now()} number two: ${two}`);
  } catch (err) {
    return new Error(console.error(`${err}`));
  }
  setTimeout(() => console.log(`Data is ${Date.now()} sum: ${one + two}`), 1000);
  return 0;
}
dice();
