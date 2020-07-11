const http = require('http');

const config = require('./config');
const requestHandler = require('./requestHandler');

const server = http.createServer(requestHandler);

server.listen(config.port, () => {
  console.log('Sever started.');
});
