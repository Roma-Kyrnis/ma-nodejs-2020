const axios = require('axios');
const randomRequest = require('./requests');

async function setAndGetOptions() {
  const { options, postDataJSON = null } = randomRequest();

  options.url = `http://${options.hostname}:${options.port}${options.path}`;

  if (postDataJSON) options.data = JSON.parse(postDataJSON);

  const partsOfAuth = options.auth.split(/:/);
  options.auth = { username: partsOfAuth[0], password: partsOfAuth[1] };

  delete options.hostname;
  delete options.port;
  delete options.path;

  options.headers = {
    'Content-type': 'application/json',
  };

  // console.log(options);

  return options;
}

// async function main() {
//   try {
//     const response = await axios(await setAndGetOptions());

//     console.log(response.status);
//     console.log(response.data);
//   } catch (err) {
//     console.log(err.response.status);
//     console.log(err.response.data);
//   }
// }

module.exports = {
  axios,
  setAndGetOptions,
};
