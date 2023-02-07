const http = require("http");
const { readFileSync } = require("fs");
const homePage = readFileSync("./navbar-app/index.html", "utf-8");
const logoSvg = readFileSync("./navbar-app/logo.svg", "utf8");
const browserJS = readFileSync("./navbar-app/browser-app.js", "utf8");
const styles = readFileSync("./navbar-app/styles.css", "utf8");

const server = http.createServer((req, res) => {
  console.log(req.url);
  const url = req.url;
  console.log(url);
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>ABOUT</h1>");
    res.end();
  } else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(logoSvg);
    res.end();
  } else if (url === "/browser-app.js") {
    console.log(url, 'from js', browserJS);
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(browserJS);
    res.end();
  } else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(styles);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>WRONG PAGE</h1>");
    res.end();
  }
});

server.listen(5000);
console.log("Express Tutorial");
