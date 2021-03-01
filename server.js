const { createServer } = require("http");
const app = require("./dist/App.js");

createServer((req, res) => {
  const { html } = app.render({ url: req.url });

  res.write(`
    <!DOCTYPE html>
    <main id="app">${html}</main>
    <script src="/dist/bundle.js"></script>
  `);

  res.end();
}).listen(3000);