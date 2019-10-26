const first = [1, 2, 3, 4, 5];
const second = [6, 7, 8, 9, 0];

let sumMassive = [];

for(let i = first.length - 1; i >= 0; i--) {
    sumMassive.push(first[i]);
    sumMassive.push(second[i]);
}

console.log(sumMassive);