const ram = require('./ram');

function ok(res, body) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(body));
}

function badRequest(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 400;
  res.end(JSON.stringify({ message: 'Filter value is not valid' }));
}

function getInfoAboutRam(res) {
  const body = ram.cliTool();
  ok(res, body);
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
        badRequest(res);
        throw new Error();
    }

    ok(res, body);
  } catch (err) {
    console.error(err);
  }
}

function setLimit(limit = 1000, res) {
  let body = {};
  const answer = ram.setLimit(limit);

  body.message = answer;
  body = JSON.stringify(body);

  ok(res, body);
}

module.exports = {
  getInfoAboutRam,
  getInfoAboutRamByFilter,
  setLimit,
};
