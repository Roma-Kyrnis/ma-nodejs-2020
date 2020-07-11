const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/limit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from('Roman:Test123456').toString('base64')}`,
  },
  body: {
    limit: 200,
  },
  json: true,
};

function httpRequest() {
  return new Promise((resolve, reject) => {
    try {
      const req = http.request(options, (res) => {
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
      // if (request.postDataJSON !== undefined) req.write(request.postDataJSON);
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
  } catch (error) {
    console.error(`Error in main: ${error}`);
  }

  return 0;
}

main();
