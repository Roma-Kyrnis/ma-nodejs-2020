const controller = require('./controller');

function badRequest(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 400;
  res.end(
    JSON.stringify({ message: 'New value for minimum free memory limit is not valid number' }),
  );
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

module.exports = (req, res) => {
  const { url, method, queryParams } = req;

  const { filter = null } = queryParams;

  switch (url.pathname) {
    case '/limit':
      if (method === 'POST' && !filter) {
        if (/\d+/.test(req.body.limit) && req.body.limit > 0)
          controller.setLimit(req.body.limit, res);
        else badRequest(res);
      } else {
        methodNotAllowed(res);
      }
      break;
    case '/metrics':
      if (method === 'GET') {
        if (filter) {
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
