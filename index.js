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
	socket.on('add user', function(username) {
		numUsers ++;
		console.log( username + ' has joined');
		console.log('There are now ' + numUsers + ' user(s) on the chat server');
		

	});
	socket.on('event', function(data){});
	socket.on('disconnect', function(){});
});


server.listen(port, function(){
	console.log('Server listening at ' + port);
});
