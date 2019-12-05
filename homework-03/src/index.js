let result = 0;
let number = 10;
let divisor = 2;
function isPrime() {
  for (let i = 1; i <= 100; i++) {
    if (number === divisor || divisor > Math.sqrt(number)) {
      divisor = 2;
      return true;
    }
    if (number % divisor === 0) {
      divisor = 2;
      number += 1;
      break;
    }
    divisor += 1;
  }
  return false;
}

setInterval(() => {
  if (isPrime()) {
    result = number;
    number += 1;
  }
}, 0);

setInterval(() => {
  console.log(`${Date.now()} : --IN PROCESS-- Biggest prime number found: ${result}`);
}, 1000);
