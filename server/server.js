const Express = require("express");
const server = Express();
const path = require("path");

server.use(Express.static(path.resolve("./build")));

server.get("/*", (req, res) => {
  res.sendFile(path.resolve("./build", "index.html"));
});

let port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Front end server listening on port ${port}`);
});
