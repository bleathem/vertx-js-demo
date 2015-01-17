'use strict';

var vertx = require('vertx')
  , container = require('vertx/container')
  , console = require('vertx/console');

var server = vertx.createHttpServer();
var routeMatcher = new vertx.RouteMatcher();
routeMatcher.get('/api', function(req) {
  req.response.end('My API');
});
var staticHandler = new org.vertx.mods.web.StaticFileHandler(__jvertx, 'src/client', 'src/client/index.html', false, false);

routeMatcher._to_java_handler().noMatch(staticHandler);

server.requestHandler(routeMatcher).listen(8080, 'localhost');

module.exports = server;
