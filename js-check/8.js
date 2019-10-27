class Planet{

    constructor(name, diameter) {
        this.name = name;
        this.calculationVolume(diameter);
    }

    calculationVolume(diameter) {
        this.volume = (4/3)*3.14*(Math.pow(diameter, 3));
    }
    
    printedNameAndVolume() {
        console.log("Planet " + this.name + " have a volume " + this.volume + ".");
    }
}

class Earth extends Planet {

    constructor(diameter) {
        super('Earth', diameter);
        this.diameter = diameter;
    }

    printedNameAndVolume() {
        console.log("Planet " + this.name + " have a volume " + this.volume + ".");
    }

}

let earth = new Earth(365);
earth.printedNameAndVolume();   