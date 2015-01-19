(function(vertx) {
  var eventBus = new vertx.EventBus('/eventbus')
    , user
    , token;

  var loginFormListener = function(e) {
    e.preventDefault();
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && !token) {
        token = JSON.parse(xhr.responseText).token;
        document.getElementById('loginPanel').style.display = 'none';
        document.getElementById('chatPanel').style.display = 'block';
      }
    }
    var username = document.getElementById('username');
    if (username.value) {
      user = username.value;
      xhr.open("POST","/api/user",true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send('user=' + username.value);
    }
    return false;
  }
  document.getElementById('loginForm').addEventListener('submit', loginFormListener);

  var chatSendListener = function(e) {
    e.preventDefault();
    var message = document.getElementById('message');
    var data = {
      token: token,
      user: user,
      message: message.value
    }
    eventBus.publish('demo-chat', data);
    message.value = '';
    return false;
  };
  document.getElementById('chatForm').addEventListener('submit', chatSendListener);

  var chatResponseHandler = function(data) {
    var p = document.createElement('p');
    p.textContent = data.message;
    p.className = data.user === user ? 'right' : 'left';
    var messages = document.getElementById('messages');
    messages.appendChild(p);
    messages.scrollTop = messages.scrollHeight;
  };
  eventBus.onopen = function() {
    eventBus.registerHandler('demo-chat', chatResponseHandler);
  }
}(vertx));
