const http = require('http');
const randomRequest = require('./requests');

let errorCounting = 0;
const ms = 100;
let lastStatusError;

function httpRequest() {
  return new Promise((resolve, reject) => {
    try {
      const request = randomRequest();

      const req = http.request(request.options, (res) => {
        console.log(`Options: ${JSON.stringify(request.options)}`);

        console.log(`StatusCode: ${res.statusCode}`);
        lastStatusError = res.statusCode;

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
  const timer = setInterval(() => {
    main();
  }, 2000);

  try {
    const result = await httpRequest();

    if (result.data === '') console.log('No data!');
    else console.log(JSON.parse(result.data));
    // if (result.statusCode >= 400) {
    //   if (result.statusCode === lastStatusError) ms *= 2;
    //   throw new Error();
    // }
  } catch (error) {
    errorCounting += 1;
    if (errorCounting >= 40) {
      clearInterval(timer);
      console.log(`End program!`);
      return 1;
    }
    setTimeout(() => {
      console.log(`setImmediate ${ms}`);
      main();
    }, ms);
    console.error(`Error in main: ${error}`);
  }

  return 0;
}

main();
