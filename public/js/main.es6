'use strict';


$(() => {

  // Set constants
  const $loginPage = $('.container_login'),
    $usernInput = $('.input_username'),
    $msgInput = $('.input_msg'),
    $chatPage = $('.container_chat'),
    $msgList = $('.list_msg'),
    $userList = $('.list_users');

  var socket = io();

  // Add user
  let username,
    $currentInput = $usernInput.focus();

  let addUser = () => {
    username = $usernInput.val().trim();
    
    if (username.length > 0) {
      $loginPage.fadeOut();
      $('nav').css({ 'width': '25%', 'z-index': '0'});
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
  
  // define fn to update users-count & users-word
  let updateUsers = numUsers => {
    $('.users-count').text(numUsers);
    if(numUsers == 1){
      $('.users-word').text('user');
    } else {
      $('.users-word').text('users');
    }
  }

  // Socket event handlers
  socket.on('user joined', data => {
    $('.empty').remove();
    let joinMsg = '<li><em>' + data.user + ' has joined</em></li>';
    $msgList.append(joinMsg);
    $userList.append('<li>' + data.user + '</li>');
    updateUsers(data.numUsers);
  });

  socket.on('chat message', msg => {
    let msgLi = '<li><em>' + username + ':</em> ' + msg + '</li>';
    $msgList.append(msgLi);
  });

  socket.on('user left', data => {
    let leftMsg = '<li><em>' + data.user + ' has left</em></li>';
    $msgList.append(leftMsg);
    $("ul.list_users > li:contains('" + data.user + "')").remove();
    updateUsers(data.numUsers);
  });

});