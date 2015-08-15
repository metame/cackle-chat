'use strict';

var redis = require('redis');
var client = redis.createClient();

client.on('error', err => {
  throw err;
});

module.exports = client;