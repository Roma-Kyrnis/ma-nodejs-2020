let user1 = {
    name: "Object A",
}
console.log(user1);

let user2 = new Object();
user2.name = "Object B";
console.log(user2);

function User3(name) {
    this.name = name;        
}

let user3 = new User3("Object3 C");
console.log(user3);

