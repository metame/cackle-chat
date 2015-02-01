'use strict';
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

// Routing to set static dirname for all files in /public
app.use(express.static(__dirname + '/public'));

// Chatroom

// Global variables for chat server
var numUsers = 0;

io.on('connection', function(socket) {
	console.log('Client connected')



	// Add user
		// Steps for adding users
		// 1. Define username - client
		// 2. Send username to server - client
		// 3. username + " has joined" - server
		// 4. Add username to list - server & client
	socket.on('add user', function(username) {
		socket.username = username; // grabbing client username & storing it in the session

		numUsers ++;
		console.log( socket.username + ' has joined');
		console.log('There are now ' + numUsers + ' user(s) on the chat server');


		socket.broadcast.emit('user joined', {
			username: socket.username,
			numUsers: numUsers
		});
		

	});
	socket.on('event', function(data){});
	socket.on('disconnect', function(){
		console.log( socket.username + ' has left');
		console.log('Client disconnected');
	});
});


server.listen(port, function(){
	console.log('Server listening at ' + port);
});
