const httpClient = require('./httpClient');
const requestPromiseNative = require('./request-promise-native');
const axios = require('./axios');

const valuesOfFunction = ['httpClient', 'requestPromiseNative', 'axios'];
let errorCounting = 0;
let ms = 100;
let lastStatusCodeError;
const limit = 40;
let nameFunction;

process.argv.forEach((element) => {
  if (/^httpClient$/.test(element) && nameFunction === undefined) nameFunction = 'httpClient';
  else if (/^requestPromiseNative$/.test(element) && nameFunction === undefined)
    nameFunction = 'requestPromiseNative';
  else if (/^axios$/.test(element) && nameFunction === undefined) nameFunction = 'axios';
}, valuesOfFunction);

if (nameFunction === undefined) nameFunction = 'axios';

async function main() {
  try {
    let result = {};

    switch (nameFunction) {
      case 'httpClient':
        console.log('httpClient');
        await httpClient()
          .then((response) => {
            result = response;
            if (result.data === '') console.log('No data!');
            else console.log(JSON.parse(result.data));
          })
          .catch((err) => {
            console.error(`Error with promise: ${err}`);
          });
        break;
      case 'requestPromiseNative':
        console.log('rpn');
        // eslint-disable-next-line no-case-declarations
        const objectOptions = await requestPromiseNative.getOptions();

        await requestPromiseNative
          .rpn(objectOptions.url, objectOptions.options, (err, response, body) => {
            result = response;
            console.log(`Status code: ${response.statusCode}`);
            if (response.body === undefined) console.log('No data!');
            else console.log(body);
          })
          .catch(() => {});
        break;
      case 'axios':
        console.log('axios');
        try {
          const response = await axios.axios(await axios.setAndGetOptions());

          result.statusCode = response.status;

          console.log(`Status code: ${response.status}`);
          console.log(response.data);
        } catch (err) {
          console.log(`Status code error: ${err.response.status}`);
          console.log(err.response.data);
          result.statusCode = err.response.status;
        }
        break;
      default:
    }

    if (result.statusCode >= 400) {
      if (result.statusCode === lastStatusCodeError) ms *= 2;
      else ms = 100;
      errorCounting += 1;
      if (errorCounting >= limit) return 1;
      setTimeout(() => {
        main();
      }, ms);
    }

    lastStatusCodeError = result.statusCode;
  } catch (error) {
    console.error(`Error in main: ${error}`);
    return 0;
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
