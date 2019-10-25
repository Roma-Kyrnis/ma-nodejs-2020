let text = 'Hello World!';

for(let i = 0; i<text.length; i++) {
    if(text[i] === 'o') {
        console.log(i + 1);
    }
}

const newText = text.replace(/l+/g, '')
console.log(newText);
