const express = require('express');

const configureMiddleware = require('./middleware.js');

const server = express();
configureMiddleware(server);


server.get('/', (req, res) => {
  res.send("testing mock server, main splash page goes here");
});

module.exports = server;
