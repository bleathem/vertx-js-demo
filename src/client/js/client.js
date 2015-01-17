(function(vertx) {
  var eb = new vertx.EventBus('http://localhost:8080/eventbus');

  var chat = document.getElementById('chat');
  var message = document.getElementById('message');
  var button = document.getElementById('submit');

  eb.onopen = function() {
    eb.registerHandler('demo-chat', function(message) {
      console.log('received a message: ' + JSON.stringify(message));
      var p = document.createElement("p");
      p.textContent = message;
      chat.appendChild(p);
    });
    button.addEventListener('click', function() {
      eb.publish('demo-chat', message.value);
      message.value = '';
    });
  }
}(vertx));
