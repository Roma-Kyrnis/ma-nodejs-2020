const http = require('http');
const randomRequest = require('./requests');

let errorCounting = 0;
let ms = 100;
let lastStatusCodeError;
const limit = 40;

function httpRequest() {
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
}

async function main() {
  try {
    let result;
    await httpRequest()
      .then((data) => {
        result = data;
      })
      .catch((err) => {
        console.error(`Error with promise: ${err}`);
      });

    if (result.data === '') console.log('No data!');
    else console.log(JSON.parse(result.data));

    if (result.statusCode >= 400) {
      if (result.statusCode === lastStatusCodeError) ms *= 2;
      else ms = 100;
      errorCounting += 1;
      if (errorCounting >= limit) return 1;
      setTimeout(() => {
        // console.log(`setImmediate ${ms}`);
        main();
      }, ms);
    }

    lastStatusError = result.statusCode;
  } catch (error) {
    console.error(`Error in main: ${error}`);
  }

  return 0;
}

main();

const timer = setInterval(() => {
  if (errorCounting >= limit) {
    clearInterval(timer);
    // console.log(`In interval: ${errorCounting}`);
    console.log(`\nProgram ended. Limit exceeded!`);
  } else main();
}, 5000);
