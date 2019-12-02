const result = [];
let i = 0;
function isPrime(num) {
  for (let j = 2; j < num; j++) {
    if (num % (j * j) === 0) return false;
    if (num % j === 0) return false;
  }
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
