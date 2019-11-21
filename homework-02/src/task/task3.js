function setTime(timer = 1000, text = 'resolved') {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, timer);
  });
}
module.exports = setTime(3000, 'Some text.').then((result) => console.log(result));
