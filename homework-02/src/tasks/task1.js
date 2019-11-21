const oneValue = 2;
const twoValue = 2;
const threeValue = 3;

module.exports = function Sum(one = oneValue, two = twoValue, three = threeValue) {
  return one + two + three;
};
