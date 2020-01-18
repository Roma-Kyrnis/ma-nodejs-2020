const http = require('http');

const requestHandler = require('./requestHandler');

const server = http.createServer(requestHandler);

server.listen(3000, () => {
  console.log('Sever started.');
});
