# Cackle, a Chat app
Cackle is a chat app using Node.js, Express.js, Socket.io and Redis written with ES2015/ES6.

## Deployment
1. Make sure [Node](http://nodejs.org/) & [Redis](http://redis.io/download) core packages are installed
2. Clone repo or download src
3. Change to main directory `cd cackle-chat`
4. `npm install` to install Node dependencies
5. Initialize Redis client and Redis server ([instructions here](http://redis.io/download))
6. `node .` to run chat server
7. Default port is 3000 so navigate to [http://localhost:3000/](http://localhost:3000/)

## Dependencies
Must have following installed locally or on server:
*	[Node.js](http://nodejs.org/)
*	[Redis](http://redis.io/download)

Node dependencies:
* [Socket.io](https://github.com/Automattic/socket.io)
* [Express](http://expressjs.com/)
* [Redis](http://redis.io/)
* [Babel](http://babeljs.io/)


## Credits
Some concepts and architecture inspired by the Socket.io [chat example](https://github.com/Automattic/socket.io/tree/master/examples/chat) and CodeSchool's "Chatters" app in their [Real-time Web with Node.js](https://www.codeschool.com/courses/real-time-web-with-node-js) course.
