const controller = require('./controller');

function badRequest(res, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 400;
  res.write(JSON.stringify(message));
  res.end();
}

function notFound(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Not found!' }));
  res.end();
}

function methodNotAllowed(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 405;
  res.write(JSON.stringify({ message: 'Method not allowed!' }));
  res.end();
}

function internalServerError(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 500;
  res.write(JSON.stringify({ message: 'Internal error occurred' }));
  res.end();
}

module.exports = (req, res) => {
  const { url, method, queryParams } = req;

  const { filter = null, ...other } = queryParams;

  switch (url.pathname) {
    case '/limit':
      if (method === 'POST') {
        if (Object.keys(queryParams).length === 0) {
          if (/\d+/.test(req.body.limit) && req.body.limit > 0)
            controller.setLimit(req.body.limit, res);
          else if (req.body.limit === undefined)
            badRequest(res, { message: 'Not find limit in body!' });
          else
            badRequest(res, {
              message: 'New value for minimum free memory limit is not valid number',
            });
        } else internalServerError(res);
      } else {
        methodNotAllowed(res);
      }
      break;
    case '/metrics':
      if (method === 'GET') {
        if (Object.keys(other).length !== 0) internalServerError(res);
        else if (filter) {
          controller.getInfoAboutRamByFilter(
            {
              ...req,
              filter,
            },
            res,
          );
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
