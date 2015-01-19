'use strict';

var vertx = require('vertx')
  , container = require('vertx/container')
  , console = require('vertx/console');

var server = vertx.createHttpServer()
  , token = 'HDWWER$^BBE#$552323dfxcsd3@!134#$';

var routeMatcher = new vertx.RouteMatcher();
routeMatcher.post('/api/user', function(req) {
  var data = {
    token : token
  };
  req.response.end(JSON.stringify(data));
});
var staticHandler = new org.vertx.mods.web.StaticFileHandler(__jvertx, 'src/client', 'src/client/index.html', false, false);
routeMatcher._to_java_handler().noMatch(staticHandler);
server.requestHandler(routeMatcher);

var sockJSServer = vertx.createSockJSServer(server);
sockJSServer.bridge({prefix : '/eventbus'},
  [
    {
      address: 'demo-chat',
      match: {
        token: token
      }
    }
  ],
  [{address: 'demo-chat'}]
);

server.listen(9000, '0.0.0.0');

module.exports = server;
