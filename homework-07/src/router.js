const controller = require('./controller');

let body;

function badRequest(res) {
  body.message = 'New value for minimum free memory limit is not valid number';
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 400;
  res.write('400');
  res.end();
}

function unauthorized(res) {
  body.message = 'Unauthorized';
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 401;
  res.write('401');
  res.end();
}

function notFound(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write('404');
  res.end();
}

function methodNotAllowed(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 405;
  res.write('405');
  res.end();
}

function internalServerError(res) {
  body.message = 'Internal error occurred';
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 500;
  res.write('500');
  res.end();
}

module.exports = (req, res) => {
  const { url, method, queryParams } = req;
  const { filter = null } = queryParams;

  switch (url.pathname) {
    case '/limit':
      if (method === 'POST' && !filter) {
        controller.setLimit(req.body);
      } else {
        methodNotAllowed(res);
      }
      break;
    case '/metrics':
      if (method === 'GET') {
        if (filter) {
          controller.getInfoAboutRamByFilter(req, res);
        } else {
          controller.getInfoAboutRam(res);
        }
      } else {
        methodNotAllowed(res);
      }
      break;
    default:
      notFound(res);
  }
};
