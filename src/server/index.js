const express = require('express');
const route = require('./config/route.js');
const app = express();
const env = 'development';
// var env = process.env.NODE_ENV || 'development';
var server = require('http').createServer(app);


var db = require('./config/database')(env);
require('./database').connect(db.url);

app.use(express.static('dist'));

app.use('/api', route);

server.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
