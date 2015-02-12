'use strict';
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var redis = require('./lib/redis');


// Routing to set static dirname for all files in /public
app.use(express.static(__dirname + '/public'));

// Chatroom

// Global variables for chat server
var numUsers = 0;
var userList;

io.on('connection', function(socket) {
	console.log('Client connected');



	// Add user
		// Steps for adding users
		// 1. Define username - client
		// 2. Send username to server - client
		// 3. username + " has joined" - server
		// 4. Add username to list - server & client
	socket.on('add user', function(username) {
		socket.username = username; // grabbing client username & storing it in the session

		numUsers ++;
		console.log( username + ' has joined');
		console.log('There are now ' + numUsers + ' user(s) on the chat server');

		redis.sadd('users', username, function(err, data){
    	if (err) return callback(err, null);
  	});

		io.emit('user joined', {
			user: username,
			numUsers: numUsers
		});
	});

	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		// io.emit sends event to every client while socket.broadcast.emit except specific client
		io.emit('chat message', msg);
	});


	socket.on('event', function(data){});
	socket.on('disconnect', function(){
		var username = socket.username;
		console.log(username + ' has left');
		console.log('Client disconnected');
		if (username !== undefined) {
			numUsers--;
			console.log('There are now ' + numUsers + ' user(s) on the chat server');
			redis.srem('users', username);
		}

		io.emit('user left', {
			user: username,
			numUsers: numUsers
		});
	});
});


server.listen(port, function(){
	console.log('Server listening at ' + port);
});
