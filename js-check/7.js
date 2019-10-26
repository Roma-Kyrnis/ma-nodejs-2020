const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];

let it = "cucumber";

if(vegetables[0] === it) console.log("vegetables");
    else if(vegetables[1] === it) console.log("vegetables");
        else if(vegetables[2] === it) console.log("vegetables");
else if(fruits[0] === it) console.log("fruits");
    else if(fruits[1] === it) console.log("fruits");
        else if(fruits[2] === it) console.log("fruits");
            else console.log("There is not it");


if(vegetables.includes(it)) {
    console.log("vegetables");
} else {
    if(fruits.includes(it)) {
        console.log("fruits");
    }
}

switch(it) {
    case vegetables[0]:
        console.log("vegetables");
    break;

    case vegetables[1]:
        console.log("vegetables");
    break;

    case vegetables[2]:
        console.log("vegetables");
    break;

    case fruits[0]:
        console.log("fruits");
    break;

    case fruits[1]:
        console.log("fruits");
    break;

    case fruits[2]:
        console.log("fruits");
    break;

    default:
        console.log("There is not it");
}