const controller = require('./controller');

function notFound(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Not found!' }));
  res.end();
}

module.exports = (req, res) => {
  const { url } = req;
  switch (url.pathname) {
    case '/limit':
      controller.setLimit(req, res);
      break;
    case '/metrics':
      controller.getInfoAboutRam(req, res);
      break;
    default:
      notFound(res);
  }
};
