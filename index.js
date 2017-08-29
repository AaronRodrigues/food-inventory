"use strict";

const app = require('./app');
const port = process.env.PORT || 3010;

// Spin up a server using the HTTP protocol
const server = require('http').createServer(app);

// Spin up the server on the specified port
server.listen(port, () => {
  console.log('Listening on port: ' + port);
});