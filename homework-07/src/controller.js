const ram = require('./ram');

function ok(res, body) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.write(JSON.stringify(body));
  res.end();
}

function badRequest(res, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 400;
  res.write(JSON.stringify(message));
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

function getInfoAboutRamByFilter(req, res) {
  try {
    const body = {};
    const { message, ...params } = ram.cliTool();

    body.message = message;

    switch (req.filter) {
      case 'total':
        body.total = params.total;
        break;
      case 'free':
        body.free = params.free;
        break;
      case 'allocated':
        body.allocated = params.allocated;
        break;
      default:
        badRequest(res, { message: 'Filter value is not valid' });
        return 0;
    }

    ok(res, body);
  } catch (err) {
    console.error(err);
  }
  return 0;
}

function getInfoAboutRam(req, res) {
  const body = ram.cliTool();

  const { method, queryParams } = req;

  const { filter = null, ...other } = queryParams;

  if (method === 'GET') {
    if (Object.keys(other).length !== 0) internalServerError(res);
    if (filter) {
      getInfoAboutRamByFilter(
        {
          ...req,
          filter,
        },
        res,
      );
    } else ok(res, body);
  } else methodNotAllowed(res);
}

function setLimit(req, res) {
  const body = {};

  const { method, queryParams } = req;

  if (method === 'POST') {
    if (Object.keys(queryParams).length === 0) {
      if (/\d+/.test(req.body.limit) && req.body.limit > 0) {
        const answer = ram.setLimit(req.body.limit);

        body.message = answer;
      } else if (req.body.limit === undefined)
        badRequest(res, { message: 'Not find limit in body!' });
      else
        badRequest(res, { message: 'New value for minimum free memory limit is not valid number' });
    } else internalServerError(res);
  } else {
    methodNotAllowed(res);
  }

  ok(res, body);
}

module.exports = {
  getInfoAboutRam,
  getInfoAboutRamByFilter,
  setLimit,
};
