'use strict';


$(() => {

  // Set constants
  const $loginPage = $('.container_login'),
    $usernInput = $('.input_username'),
    $msgInput = $('.input_msg'),
    $chatPage = $('.container_chat'),
    $msgList = $('.list_msg');

  var socket = io();

  // Add user
  let username,
    $currentInput = $usernInput.focus();

  let addUser = () => {
    username = $usernInput.val().trim();
    
    if (username.length > 0) {
      $loginPage.fadeOut();
      $chatPage.show();
      $currentInput = $msgInput.focus();
      socket.emit('add user', username);
    }
  };

  // Add message
  let addMsg = () => {
    let message = $msgInput.val().trim();
    if (!username) {
      alert('Enter username first before sending a message!');
    } else if (message.length > 0) {
      socket.emit('chat message', message);
      $msgInput.val('');
    }
  };
  
  // Input Event handlers
  $('.btn_username').click( e => {
    addUser();
    e.preventDefault();
  });

  $('.btn_msg').click( e => {
    addMsg();
    e.preventDefault();
  });

  // Socket event handlers
  socket.on('user joined', data => {
    let joinMsg = '<li><em>' + data.user + ' has joined</em></li>';
    $msgList.append(joinMsg);
    $('.user-count').text(data.numUsers);
  });

  socket.on('chat message', msg => {
    let msgLi = '<li><em>' + username + ':</em> ' + msg + '</li>';
    $msgList.append(msgLi);
  });

  socket.on('user left', data => {
    let leftMsg = $('<li>').text(data.user + ' has left');
    $msgList.append(leftMsg);
    $('.user-count').text(data.numUsers);
  });

});