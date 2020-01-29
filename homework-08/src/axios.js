const axios = require('axios');
const randomRequest = require('./requests');

async function setAndGetOptions() {
  const { options, postDataJSON = null } = randomRequest();

  options.url = `http://${options.hostname}:${options.port}${options.path}`;

  if (postDataJSON) options.data = JSON.parse(postDataJSON);

  if (options.auth) {
    const partsOfAuth = options.auth.split(/:/);
    options.auth = { username: partsOfAuth[0], password: partsOfAuth[1] };
  }

  options.headers = {
    'Content-type': 'application/json',
  };

  return options;
}

module.exports = {
  axios,
  setAndGetOptions,
};
