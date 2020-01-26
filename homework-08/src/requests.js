const postData = {
  limit: 200,
};

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '',
  method: '',
  auth: '',
  headers: {
    'Content-Type': 'application/json',
  },
};

const output = {};
let postDataJSON;

function setLimit(limit) {
  options.path = '/limit';
  options.method = 'POST';
  options.auth = 'Roman:Test123456';
  postData.limit = limit;
  postDataJSON = JSON.stringify(postData);
  output.postDataJSON = postDataJSON;
}

function getInfoAboutRamWithFilterActivation(filter) {
  options.path = '/metrics';
  options.method = 'GET';
  options.auth = 'Roman:Test123456';

  if (filter) {
    switch (filter) {
      case 1:
        options.path += '?filter=free';

        break;
      case 2:
        options.path += '?filter=allocated';

        break;
      default:
        options.path += '?filter=total';
    }
  }
}

function getCode400ByLimit() {
  options.path = '/limit';
  options.method = 'POST';
  options.auth = 'Roman:Test123456';
  postData.limit = 'error';
  postDataJSON = JSON.stringify(postData);
  output.postDataJSON = postDataJSON;
}

function getCode400ByMetrics() {
  options.path = '/metrics?filter=error';
  options.method = 'GET';
  options.auth = 'Roman:Test123456';
}

function getCode401() {
  options.auth = 'Roman';
}

function getCode404() {
  options.path = '/Error';
  options.auth = 'Roman:Test123456';
}

function getCode405() {
  options.path = '/limit';
  options.auth = 'Roman:Test123456';
}

function getCode500() {
  options.auth = '';
}

module.exports = function randomRequest() {
  // console.clear();
  const randomNumberErrorOrOk = Math.floor(Math.random() * 100) + 1;

  if (randomNumberErrorOrOk >= 35) {
    const randomNumberForOk = Math.floor(Math.random() * 3);

    switch (randomNumberForOk) {
      case 1:
        getInfoAboutRamWithFilterActivation();
        break;
      case 2:
        getInfoAboutRamWithFilterActivation(Math.floor(Math.random() * 3));
        break;
      default:
        setLimit(Math.floor(Math.random() * 1000) + 1);
    }
  } else {
    const randomNumberForErrorCode = Math.floor(Math.random() * 6);

    switch (randomNumberForErrorCode) {
      case 1:
        getCode400ByMetrics();
        break;
      case 2:
        getCode401();
        break;
      case 3:
        getCode404();
        break;
      case 4:
        getCode405();
        break;
      case 5:
        getCode500();
        break;
      default:
        getCode400ByLimit();
    }
  }

  output.options = options;

  return output;
};
