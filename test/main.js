// reference for tests http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/
var should = require('should'),
    io = require('socket.io-client'),
    config = require('../config');
    
var socketURL = '0.0.0.0:8080';

var options ={
    transports: ['websocket'],
    'forceNew': true,
    'autoConnect': false
};

var chatUser1 = 'Tom',
    chatUser2 = 'Sally',
    chatUser3 = 'Dana';
    
describe('chat server', function(){
    it('should broadcast new user to all users', function(done){
        var client1 = io.connect(socketURL, options);
        
        client1.on('connection', function(data){
            client1.emit('add user', chatUser1);
            
            var client2 = io.connect(socketURL, options);
            
            client2.on('connection', function(data){
                client2.emit('add user', chatUser2);
            });
            
            client2.on('user joined', function(data){
                var username = data.user;
                username.should.equal(chatUser2);
                client2.disconnect();
            });
        });
        
        var numUsers = 0;
        client1.on('user joined', function(data){
            var username = data.user;
            numUsers++;
            
            if(numUsers === 2){
                username.should.equal(chatUser2);
                client1.disconnect();
                done();
            }
        });
        
       
       
    });
});