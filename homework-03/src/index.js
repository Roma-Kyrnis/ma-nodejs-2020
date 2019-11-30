const result = [];
let i = 0;
function isPrime(num) {
  let under;
  if (num <= 10) under = num;
  else under = 10;
  for (let j = 2; j < under; j++) if (num % j === 0) return false;
  return num > 1;
}
setInterval(() => {
  if (isPrime(i)) {
    result.push(i);
  }
  i += 1;
}, 0);
setInterval(() => {
  console.log(
    `${Date.now()} : --IN PROCESS-- Biggest prime number found: ${result[result.length - 1]}`,
  );
}, 1000);
