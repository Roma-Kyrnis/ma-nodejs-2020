let result = 2;
let i = 0;
function isPrime(num) {
  let under;
  if (num <= 10) under = num;
  else under = 10;
  for (let j = 2; j < under; j += 1) if (num % j === 0) return false;
  return num > 1;
}
setInterval(() => {
  if (isPrime(i)) {
    result = i;
  }
  i += 1;
}, 100);

setInterval(() => {
  console.log(result);
}, 1000);
