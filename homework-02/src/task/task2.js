class Earth {
  constructor() {
    this.name = 'Earth';
  }

  addDiameterAndCalculateVolume(diameter) {
    this.diameter = diameter;
    this.calculateVolume(diameter);
  }

  calculateVolume(diameter) {
    this.volume = ((4 / 3) * 3.14 * diameter ** 3).toFixed(2);
  }

  printedNameAndVolume() {
    console.log(`Planet ${this.name} have a volume ${this.volume}`);
  }
}
const earth = new Earth();

module.exports = earth;
