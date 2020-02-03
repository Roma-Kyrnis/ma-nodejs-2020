const rpn = require('request-promise-native');
const randomRequest = require('./requests');

function getOptions() {
  const { options, postDataJSON = null } = randomRequest();

  if (options.auth !== '')
    options.headers = {
      Authorization: `Basic ${Buffer.from(options.auth).toString('base64')}`,
    };
  delete options.auth;
  if (postDataJSON) options.body = JSON.parse(postDataJSON);
  options.resolveWithFullResponse = true;
  options.json = true;

  return { options, url: `http://${options.hostname}:${options.port}${options.path}` };
}

module.exports = {
  rpn,
  getOptions,
};
