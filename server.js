// Node w/o express

const http = require('http');
const fs = require('fs').promises;
const host = 'localhost';
const port = 8000;

let html;
let css;
let js;

const requestListener = function (req, res) {
  if (req.url.indexOf('.css') != -1) {
    fs.readFile(__dirname + "/docs/index.css")
    .then(contents => {
      css = contents;
      res.writeHead(200, {"Content-Type": "text/css"});
      res.write(css);
      res.end();
    })
    .catch(err => {
      res.writeHead(500);
      res.end(err);
      return;
    });

  } else if (req.url.indexOf('.js') != -1) {
    fs.readFile(__dirname + "/docs/index.js")
    .then(contents => {
      js = contents;
      res.writeHead(200, {"Content-Type": "text/javascript"});
      res.write(js);
      res.end();
    })
    .catch(err => {
      res.writeHead(500);
      res.end(err);
      return;
    });
  } else if (req.url === '/' || req.url.indexOf('.html') != -1) {
    fs.readFile(__dirname + "/docs/index.html")
        .then(contents => {
          html = contents;
          res.writeHead(200, {"Content-Type": "text/html"});
          res.write(html);
          res.end();
        })
        .catch(err => {
          res.writeHead(500);
          res.end(err);
          return;
    });
  } else if (req.url.match(/\.(jpg|jpeg|png|gif)$/)) {
    const imagePath = __dirname + "/docs" + req.url;

    const fileExtension = req.url.split(".").pop();
    const mimeTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif'
    };

    fs.readFile(imagePath)
      .then(contents => {
        res.writeHead(200, {"Content-Type": mimeTypes[fileExtension]});
        res.end(contents);
      })
      .catch(err => {
        console.error("Error in serving image:", err);
        res.writeHead(404);
        res.end("Image not found");
        return;
      });
  } else {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end("Page not found");
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});