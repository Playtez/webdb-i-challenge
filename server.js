const express = require("express");

const accountRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter);

server.get("/", (req, res) => {
  res.send("<h2> Welcome to the home page</h2>");
});

module.exports = server;
