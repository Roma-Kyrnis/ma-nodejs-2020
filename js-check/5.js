const data = '21345A67098';

for(let i in data) {
    if((data[i])%2 === 0 && data[i] !== '0') {
        process.stdout.write(data[i]);
    }
}