'use strict';

$(function () {

  // Set constants
  var $loginPage = $('.container_login'),
      $usernInput = $('.input_username'),
      $msgInput = $('.input_msg'),
      $chatPage = $('.container_chat'),
      $msgList = $('.list_msg'),
      $userList = $('.list_users');

  var socket = io();

  // Add user
  var username = undefined,
      $currentInput = $usernInput.focus();

  var addUser = function addUser() {
    username = $usernInput.val().trim();

    if (username.length > 0) {
      $loginPage.fadeOut();
      $('nav').css({ 'width': '25%', 'z-index': '0' });
      $chatPage.show();
      $currentInput = $msgInput.focus();
      socket.emit('add user', username);
    }
  };

  // Add message
  var addMsg = function addMsg() {
    var message = $msgInput.val().trim();
    if (!username) {
      alert('Enter username first before sending a message!');
    } else if (message.length > 0) {
      socket.emit('chat message', message);
      $msgInput.val('');
    }
  };

  // Input Event handlers
  $('.btn_username').click(function (e) {
    addUser();
    e.preventDefault();
  });

  $('.btn_msg').click(function (e) {
    addMsg();
    e.preventDefault();
  });

  // define fn to update users-count & users-word
  var updateUsers = function updateUsers(numUsers) {
    $('.users-count').text(numUsers);
    if (numUsers == 1) {
      $('.users-word').text('user');
    } else {
      $('.users-word').text('users');
    }
  };

  // Socket event handlers
  socket.on('user joined', function (data) {
    $('.empty').remove();
    var joinMsg = '<li><em>' + data.user + ' has joined</em></li>';
    $msgList.append(joinMsg);
    $userList.append('<li>' + data.user + '</li>');
    updateUsers(data.numUsers);
  });

  socket.on('chat message', function (msg) {
    var msgLi = '<li><em>' + username + ':</em> ' + msg + '</li>';
    $msgList.append(msgLi);
  });

  socket.on('user left', function (data) {
    var leftMsg = '<li><em>' + data.user + ' has left</em></li>';
    $msgList.append(leftMsg);
    $("ul.list_users > li:contains('" + data.user + "')").remove();
    updateUsers(data.numUsers);
  });
});