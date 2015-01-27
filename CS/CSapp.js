// this is the app file built from notes/following Code School's node course

var express = require('express');
var app = express();
var server = require('http').createServer(app); // passes express app as listener for http server
var io = require('socket.io')(server);  // socket.io & express are using same http server, i.e socket is listening on this server & as well as express
var redis = require('redis');
var redisClient = redis.createClient();

io.on('connection', function(client) {
  console.log('Client connected...');

  client.emit('messages', { hello: 'world' });
});
var messages = [];
var storeMessage = function(name, data){
  var message = JSON.stringify({name: name, data: data});

  redisClient.lpush('messages', message, function(err, response){
  redisClient.ltrim('messages', 0, 9);
  });
}

io.on('connection', function(client) {

  client.on('join', function(name) {
    client.nickname = name; // make var available both on server & client

    client.broadcast.emit('add chatter', name);

    // emit all the currently logged in chatters to the newly connected client
    redisClient.smembers('names', function(err, names) {
      names.forEach(function(name){
        client.emit('add chatter', name);
      });
    });

    redisClient.sadd('chatters', name);

    redisClient.lrange("messages", 0, -1, function(err, messages) {
      messages = messages.reverse();

      messages.forEach(function(message) {
        message = JSON.parse(message); // parse into JSON object
      client.emit('messages', message.name + ': ' + message.data);
      });
    });
    
  });

  

  client.on('messages', function(data) {
    var nickname = client.nickname; // get nickname of client before broadcasting msg
    client.broadcast.emit('message', nickname + ': ' + message); // broadcast with name & msg
    client.emit('messages', nickname + ': ' + message); // send same msg back to client, i.e. so client can see own msgs
    storeMessage(name, message);
  });

  client.on('disconnect', function(){
    client.get('nickname', function(err, name){
      client.broadcast.emit('remove chatter', name);
      redisClient.srem('chatters', name);
    });
  });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080, function(){
  console.log('Server listening on port %d', 8080);
});
