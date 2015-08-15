'use strict';


$(() => {

	// Variable list
	const	$usernInput = $('.usernInput'),
			$msgInput = $('.msgInput'),
			$userPage = $('.userPage'),
			$chatPage = $('.chatPage'),
			$msgList = $('#msgList');

	var socket = io();

	// Add user
	let username,
		$currentInput = $usernInput.focus();

	// Initial environment

	

	let addUser = () => {
		username = $usernInput.val().trim();
		
		if (username.length > 0) {
			$userPage.fadeOut();
			$chatPage.show();
			$currentInput = $msgInput.focus();
			socket.emit('add user', username);
		}
	};

	let addMsg = () => {
		let message = $msgInput.val().trim();
		if (!username) {
			alert('Enter username first before sending a message!');
		} else if (message.length > 0) {
			socket.emit('chat message', message);
			$msgInput.val('');
		}
	};
	
	$('.userBtn').click( e => {
		addUser();
		e.preventDefault();
	});

	$('.msgBtn').click( e => {
		addMsg();
		e.preventDefault();
	});

	socket.on('user joined', data => {
		let joinMsg = $('<li>').text(data.user + ' has joined');
		$msgList.append(joinMsg);
		$('.numUsers').text(data.numUsers);
	});

	socket.on('chat message', msg => {
		let msgLi = '<li>' + username + ': ' + msg + '</li>';
		$msgList.append(msgLi);
	});

	socket.on('user left', data => {
		let leftMsg = $('<li>').text(data.user + ' has left');
		$msgList.append(leftMsg);
		$('.numUsers').text(data.numUsers);
	});

});