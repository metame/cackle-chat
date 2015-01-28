'use strict';
$(function() {

	// Variable list
	var $usernInput = $('#usernInput');
	var $msgInput = $('#msgInput');
	var socket = io();

	// Add user
	var username;

	function addUser () {
		username = $usernInput.val();
		socket.emit('add user', { username: username });
	}
	
	$('#userBtn').click( addUser() );

});