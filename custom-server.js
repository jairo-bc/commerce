const next = require('next')

const nextConfig = require('./next.config');
console.log(nextConfig.assetPrefix);

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
app.prepare().then(async () => {
  console.log("here");
  const domain = "http://localhost:3000"; // get from nextConfig or other config
  const req = {};
  const res = {};
  const query = '';
  const pathname = "/blog"; // read from cli or other place
  const html = await app.renderToHTML(req, res, pathname, query);
  console.log(html);
})