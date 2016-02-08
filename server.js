'use strict';

process.on('uncaughtException', function(err) {
  console.error('uncaughtException');
  console.error(err);

  process.exit(1);
});

var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.use(express.static('public'));

app.post('/', function(req, res) {
});

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000, function() {
  console.log('server starting at 127.0.0.1:3000');
});
