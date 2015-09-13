'use strict';
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	port = process.env.PORT || 3000,
	redis = require('./lib/redis'),
	path = require('path'),
	routes = require('./routes');


// Routing to set static dirname for all files in /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// load routes
app.use('/', routes);

// --------- Chatroom ------------

// Global variables for chat server
let numUsers = 0;

// clean up users in db in case redis server fails
redis.smembers('users', (err, data) => {
	if(err) throw err;
	let users = data;
	if(users[0]){
		for(let user of users) {
			redis.srem('users',user);
		}
	}
});

io.on('connection', socket => {
	console.log('Client connected');
	
	// Add user
		// Steps for adding users
		// 1. Define username - client
		// 2. Send username to server - client
		// 3. username + " has joined" - server
		// 4. Add username to list - server & client
	socket.on('add user', username => {
		socket.username = username; // grabbing client username & storing it in the session

		numUsers++;
		console.log( username + ' has joined');
		console.log('There are now ' + numUsers + ' user(s) on the chat server');

		redis.sadd('users', username, (err, data) => {
    		if (err) return callback(err, null);
  		});

		io.emit('user joined', {
			user: username,
			numUsers: numUsers
		});
	});

	socket.on('chat message', msg => {
		console.log('message: ' + msg);
		// io.emit sends event to every client while socket.broadcast.emit except specific client
		io.emit('chat message', msg);
	});

	socket.on('event', data => {});
	
	socket.on('disconnect', () => {
		let username = socket.username;
		console.log(username + ' has left');
		console.log('Client disconnected');
		if (username !== undefined) {
			numUsers--;
			console.log('There are now ' + numUsers + ' user(s) on the chat server');
			redis.srem('users', username);
			
			io.emit('user left', {
				user: username,
				numUsers: numUsers
			});
		}
	});
});


server.listen(port, () => {
	console.log('Server listening at ' + port);
});
