const controller = require('./controller');

async function badRequest(res, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 400;
  res.write(JSON.stringify(message));
  res.end();
}

async function notFound(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Not found!' }));
  res.end();
}

async function methodNotAllowed(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 405;
  res.write(JSON.stringify({ message: 'Method not allowed!' }));
  res.end();
}

async function internalServerError(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 500;
  res.write(JSON.stringify({ message: 'Internal error occurred' }));
  res.end();
}

module.exports = async (req, res) => {
  const { url, method, queryParams } = req;

  const { filter = null, ...other } = queryParams;

  switch (url.pathname) {
    case '/limit':
      if (method === 'POST') {
        if (Object.keys(queryParams).length === 0) {
          if (/\d+/.test(req.body.limit) && req.body.limit > 0)
            await controller.setLimit(req.body.limit, res);
          else if (req.body.limit === undefined)
            await badRequest(res, { message: 'Not find limit in body!' });
          else
            await badRequest(res, {
              message: 'New value for minimum free memory limit is not valid number',
            });
        } else await internalServerError(res);
      } else {
        await methodNotAllowed(res);
      }
      break;
    case '/metrics':
      if (method === 'GET') {
        if (Object.keys(other).length !== 0) internalServerError(res);
        else if (filter) {
          await controller.getInfoAboutRamByFilter(
            {
              ...req,
              filter,
            },
            res,
          );
        } else {
          await controller.getInfoAboutRam(res);
        }
      } else {
        await methodNotAllowed(res);
      }
      break;
    default:
      await notFound(res);
  }
};
