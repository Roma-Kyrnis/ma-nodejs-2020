module.exports = (req) => {
  const header = req.headers.authorization;
  const token = header.split(/\s+/).pop();
  const auth = Buffer.from(token, 'base64').toString();
  const parts = auth.split(/:/);
  const username = parts[0];
  const password = parts[1];

  if (/^Basic /.test(header) && username === 'Roman' && password === 'Test123456') return true;
  return false;
};
