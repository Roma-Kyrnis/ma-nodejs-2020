const http = require('http');
const path = require('path');

const fsp = require('fs').promises;
const requestHandler = require('./requestHandler');
const ram = require('./ram');

const server = http.createServer('request', requestHandler);

server.listen(3000, () => {
  console.log('Sever started.');
});
