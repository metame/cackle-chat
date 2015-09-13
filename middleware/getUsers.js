const redis = require('../lib/redis');

module.exports = (req, res, next) => {
    redis.smembers('users', (err, data) => {
        if(err) throw err;
        req.users = data;
        next();
    });
};