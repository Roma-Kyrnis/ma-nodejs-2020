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

let output = {};

function setLimit(limit) {
  options.path = '/limit';
  options.method = 'POST';
  options.auth = 'Roman:Test123456';
  postData.limit = limit;
  output.postDataJSON = JSON.stringify(postData);
}

function get200Code() {
  options.path = '/get200Code';
  options.method = 'GET';
  options.auth = 'Roman:Test123456';
}

function getInfoAboutRamWithFilterActivation(filter) {
  options.path = '/metrics';
  options.method = 'GET';
  options.auth = 'Roman:Test123456';

  if (filter) {
    switch (filter) {
      case 1:
        options.path = '/metrics?filter=free';

        break;
      case 2:
        options.path = '/metrics?filter=allocated';

        break;
      default:
        options.path = '/metrics?filter=total';
    }
  }
}

function getCode400ByLimit() {
  options.path = '/limit';
  options.method = 'POST';
  options.auth = 'Roman:Test123456';
  postData.limit = 'error';
  output.postDataJSON = JSON.stringify(postData);
}

function getCode400ByMetrics() {
  options.path = '/metrics?filter=error';
  options.method = 'GET';
  options.auth = 'Roman:Test123456';
}

function getCode401() {
  options.path = '/metrics';
  options.method = 'GET';
  options.auth = 'Roman';
}

function getCode404() {
  options.path = '/error';
  options.method = 'GET';
  options.auth = 'Roman:Test123456';
}

function getCode405() {
  options.path = '/limit';
  options.method = '';
  options.auth = 'Roman:Test123456';
}

function getCode500() {
  options.auth = '';
  options.path = '/metrics';
  options.method = 'GET';
}

module.exports = function randomRequest() {
  // console.clear();
  const randomNumberErrorOrOk = Math.floor(Math.random() * 100) + 1;

  output = {};

  if (randomNumberErrorOrOk >= 35) {
    switch (Math.floor(Math.random() * 3)) {
      case 1:
        getInfoAboutRamWithFilterActivation(Math.floor(Math.random() * 3));
        break;
      case 2:
        get200Code();
        break;
      default:
        setLimit(Math.floor(Math.random() * 1000) + 1);
    }
  } else {
    switch (Math.floor(Math.random() * 6)) {
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
