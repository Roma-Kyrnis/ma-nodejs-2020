const http = require('http');
const randomRequest = require('./requests');

module.exports = function httpRequest() {
  return new Promise((resolve, reject) => {
    try {
      const request = randomRequest();

      const req = http.request(request.options, (res) => {
        // console.log(`Options: ${JSON.stringify(request.options)}`);

        console.log(`\nStatusCode: ${res.statusCode}`);

        res.setEncoding('utf8');

        let rawData = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          res.data = rawData;
          resolve(res);
        });
        res.on('error', (err) => {
          console.error(`problem with request: ${err.message}`);
          reject(err);
        });
      });
      if (request.postDataJSON !== undefined) req.write(request.postDataJSON);
      req.end();
    } catch (err) {
      console.error(`Error in httpRequest: ${err}`);
    }
  });
};
