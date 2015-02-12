'use strict';


$(function() {

	// Variable list
	var $usernInput = $('.usernInput');
	var $msgInput = $('.msgInput');

	var $userPage = $('.userPage');
	var $chatPage = $('.chatPage');
	var $msgList = $('#msgList');

	var socket = io();

	// Add user
	var username;
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
	
	$('.userBtn').click( function (e) {
		addUser();
		e.preventDefault();
	});

	$('.msgBtn').click( function (e) {
		addMsg();
		e.preventDefault();
	});

	socket.on('user joined', function (data) {
		var joinMsg = $('<li>').text(data.user + ' has joined');
		$msgList.append(joinMsg);
		$('.numUsers').text(data.numUsers);
	});

	socket.on('chat message', function (msg) {
		var msgLi = '<li>' + username + ': ' + msg + '</li>';
		$msgList.append(msgLi);
	});

	socket.on('user left', function (data) {
		var leftMsg = $('<li>').text(data.user + ' has left');
		$msgList.append(leftMsg);
		$('.numUsers').text(data.numUsers);
	});

});