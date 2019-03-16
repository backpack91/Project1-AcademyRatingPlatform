const express = require('express');
const route = require('./config/route.js');
const bodyParser = require('body-parser');
const app = express();
const env = 'development';
const server = require('http').createServer(app);

const db = require('./config/database')(env);
require('./database').connect(db.url);

app.use(express.static('dist'));

app.use('/api', route);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({error: err});
});

server.listen(8081, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Express listening on port http://%s:%s', host, port);
});

module.exports = app;
