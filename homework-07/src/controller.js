const ram = require('./ram');

function getInfoAboutRam(res) {
  const body = ram.cliTool();
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  // res.write(body);
}

function getInfoAboutRamByFilter(req, res) {
  const { key, value } = ram.cliTool();
}

function setLimit(limit) {
  return ram.setLimit(limit);
}

module.exports = {
  getInfoAboutRam,
  getInfoAboutRamByFilter,
  setLimit,
};
