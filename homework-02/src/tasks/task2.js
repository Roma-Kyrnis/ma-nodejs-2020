class Earth {
  constructor(name, diameter) {
    this.name = name;
    this.diameter = diameter;
  }

  calculateVolume() {
    this.volume = ((4 / 3) * 3.14 * this.diameter ** 3).toFixed(2);
  }

  printedNameAndVolume() {
    console.log(`Planet ${this.name} have a volume ${this.volume}`);
  }
}
const earth = new Earth('Earth', 10);
earth.calculateVolume();

module.exports = earth;
