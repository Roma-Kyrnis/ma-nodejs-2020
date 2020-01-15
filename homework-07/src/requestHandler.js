const url = require('url');
const querystring = require('querystring');
const router = require('./router');

module.exports = async (request, response) => {
  try {
    const { url: uri } = request;

    const parsedUrl = url.parse(uri);
    const queryParams = querystring.decode(parsedUrl.query);

    let body = [];

    request
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString(); // const { key, value } =
        // if (key === 'limit' && request.method() === 'POST' && parsedUrl.pathname === '/limit')
        //   value;

        router(
          {
            ...request,
            body: body ? JSON.parse(body) : {},
            url: parsedUrl,
            queryParams,
          },
          response,
        );
      });

    response.end('Hello World!');
  } catch (err) {
    console.error(`Ops! ${err}`);
  }
};

// if(request.Authorization === 'Basic') {

// } else {
//   response.
// }
