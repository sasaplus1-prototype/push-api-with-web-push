'use strict';

process.on('uncaughtException', function(err) {
  console.error('uncaughtException');
  console.error(err);

  process.exit(1);
});

var express = require('express');

var app = express();

app.disable('x-powered-by');

app.post('/', function(req, res) {
});

app.listen(3001, function() {
  console.log('push server starting at 127.0.0.1:3001');
});
