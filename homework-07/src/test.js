let data = 'romanTest123456';
let buff = new Buffer(data);
let base64data = buff.toString('base64');

let buff2 = new Buffer(base64data, 'base64');
let text = buff2.toString('ascii');
