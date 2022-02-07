const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "/homepage.html" : req.url
  );

  // Extension of file
  let extName = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check extName and set content type
  switch (extName) {
    case ".html":
      contentType = "text/html";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
  }

  // Read file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // 404 Page not found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data, "utf8");
        });
      } else {
        // Server issue
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success response
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data, "utf8");
    }
  });
});

server.listen(3000, () => {
  console.log(`The server it's running`);
});
