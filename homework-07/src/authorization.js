const config = require('./config');

function unauthorized(res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 401;
  res.write(JSON.stringify({ message: 'Unauthorized' }));
  res.end();
}

module.exports = (req, res) => {
  const header = req.headers.authorization;
  const token = header.split(/\s+/).pop();
  const auth = Buffer.from(token, 'base64').toString();
  const parts = auth.split(/^[A-Z][a-z]+:/);
  const username = auth.match(/^[A-Z][a-z]+/)[0];
  const password = parts[1];

  if (/^Basic /.test(header) && username === config.username && password === config.password)
    return 1;
  unauthorized(res);
  return 0;
};
