const { parse } = require('url')
const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

app.prepare().then(() => {
  const server = express()
  const port = 3007;
  server.get('*', async (req, res) => {
    const now = new Date();
    res.end = (html) => {
      console.log('here');
      console.log(html);
      if (html) {
        const end = new Date();
        const diff = (end - now) / 1000 ;
        console.log(`Finished in ${diff} secs`);
      }
    }
    const data = await app.render(req, res, req.path, {
      ...req.query,
      ...req.params,
    });
    res.end(data)
  })
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})