const httpClient = require('./httpClient');
const clientRPN = require('./clientRPN');
const clientAxios = require('./clientAxios');

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

if (nameFunction === undefined) nameFunction = 'requestPromiseNative';

async function retry(result, func) {
  if (result.statusCode === lastStatusCodeError) ms *= 2;
  else ms = 100;
  errorCounting += 1;
  if (errorCounting >= limit) return 1;
  lastStatusCodeError = result.statusCode;
  setTimeout(() => {
    func();
  }, ms);

  return 0;
}

async function fHttpClient() {
  let result = {};

  console.log('httpClient');
  await httpClient()
    .then((response) => {
      result = response;
      if (result.data === '') console.log('No data!');
      else console.log(JSON.parse(result.data));
      if (result.statusCode < 400) lastStatusCodeError = result.statusCode;
      if (result.statusCode >= 400) retry(result, fHttpClient);
    })
    .catch((err) => {
      console.error(`Error with promise: ${err}`);
    });
}

async function fRequestPromiseNative() {
  let result = {};

  console.log('rpn');
  const objectOptions = clientRPN.getOptions();

  await clientRPN
    .rpn(objectOptions.url, objectOptions.options, (err, response, body) => {
      result = response;
      console.log(`Status code: ${response.statusCode}`);
      if (response.body === undefined) console.log('No data!');
      else console.log(body);
      if (result.statusCode < 400) lastStatusCodeError = result.statusCode;
    })
    .catch(() => {
      retry(result, fRequestPromiseNative);
    });
}

async function fAxios() {
  const result = {};

  console.log('axios');
  try {
    const response = await clientAxios.axios(clientAxios.setAndGetOptions());

    result.statusCode = response.status;

    console.log(`Status code: ${response.status}`);
    console.log(response.data);
    lastStatusCodeError = result.statusCode;
  } catch (err) {
    console.log(`Status code error: ${err.response.status}`);
    console.log(err.response.data);
    result.statusCode = err.response.status;
    retry(result, fAxios);
  }
}

async function main() {
  try {
    switch (nameFunction) {
      case 'httpClient':
        fHttpClient();
        break;
      case 'requestPromiseNative':
        fRequestPromiseNative();
        break;
      case 'axios':
        fAxios();
        break;
      default:
    }
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
