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
	var $currentInput = $usernInput.focus();

	// Initial environment

	

	function addUser () {
		username = $usernInput.val().trim();
		

		if (username.length > 0) {
			$userPage.fadeOut();
			$chatPage.show();
			$currentInput = $msgInput.focus();

			// Will move this to socket.on('user joined') to broadcast
			var userLi = '<li>' + username + '</li>';
			$userList.append(userLi);

			socket.emit('add user', username);

		}
	}

	function addMsg () {
		var message = $msgInput.val().trim();

		if (message.length > 0 && username) {
			var msgLi = '<li>' + username + ': ' + message + '</li>';
			$msgList.append(msgLi);
		}
		$msgInput.val('');
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

	socket.on('user joined', function (data) {

	});

});