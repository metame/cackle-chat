'use strict';


$(function() {

	// Variable list
	var $usernInput = $('.usernInput');
	var $msgInput = $('.msgInput');

	var $userPage = $('.userPage');
	var $chatPage = $('.chatPage');
	var $userList = $('#userList');
	var $msgList = $('#msgList');

	var socket = io();

	// Add user
	var username;
	var users = [];
	var $currentInput = $usernInput.focus();

	// Initial environment

	

	function addUser () {
		username = $usernInput.val().trim();
		
		if (username.length > 0) {
			$userPage.fadeOut();
			$chatPage.show();
			$currentInput = $msgInput.focus();
			socket.emit('add user', username);
		}
	}

	function addMsg () {
		var message = $msgInput.val().trim();
		if (!username) {
			alert('Enter username first before sending a message!');
		} else if (message.length > 0) {
			socket.emit('chat message', message);
			$msgInput.val('');
		}
	}

	// List users in User List
	function listUsers () {
		for (var i = 0; i < users.length; i++)
			if (users[i] !== undefined) {
				var userLi = '<li>' + users[i] + '</li>';
				$userList.append(userLi);
			}
	}
	
	$('.userBtn').click( function (e) {
		addUser();
		e.preventDefault();
	});

	$('.msgBtn').click( function (e) {
		addMsg();
		// e.stopPropagation();
		e.preventDefault();
	});

	socket.on('user joined', function (user) {
		users.push(user);
		listUsers();
		var joinMsg = $('<li>').text(user + ' has joined');
		$msgList.append(joinMsg);
	});

	socket.on('chat message', function (msg) {
		var msgLi = '<li>' + username + ': ' + msg + '</li>';
		$msgList.append(msgLi);
	});

	socket.on('user left', function (user) {
		for (var i = 0; i < users.length; i++)
			if(users[i] == user) {
				users[i] = undefined;
			}
		listUsers();
	});

});