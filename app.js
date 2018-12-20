const config = require('./config');
const restify = require('restify');
const restifyPlugins = require('restify').plugins;
const mongoose = require('mongoose');
const fs = require('fs');

// ROUTES
const routes = require('./routes');

const server = restify.createServer({
  name: config.name,
  version: config.version
});


/**
  * Middleware
  */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.fullResponse());
server.use((req, res, next) => {
  // Resolve the cross-origin problem
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});


// Routes
server.get('/', function indexHTML(req, res, next) {
  fs.readFile(__dirname + '/index.html', function (err, data) {
      if (err) {
        next(err);
      return;
    }

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(data);
    next();
  });
});

require('./routes/shortener')(server);

server.listen(config.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
