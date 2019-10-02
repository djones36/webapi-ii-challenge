const express = require("express");

const server = express();

server.use(express.json());

const postEndpoint = require("./postEndpoint");

server.use("/api/post", postEndpoint);

//Test its running
server.get("/", (req, res) => {
  res.json("Server is alive");
});
module.exports = server;
