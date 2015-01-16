var vertx = require('vertx');

vertx.createHttpServer().requestHandler(function(req) {
  req.response.putHeader('Content-Type', 'text/html; charset=UTF-8')
  req.response.sendFile('src/client/index.xhtml');
}).listen(8080, 'localhost');
