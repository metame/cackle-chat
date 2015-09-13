const router = require('express').Router(),
    getUsers = require('../middleware/getUsers');

router.get('/', getUsers, (req, res) => {
   res.render('index', {title: "A chat app with Node, Socket.io, & Redis", room: "Main Room", users: req.users});
});

module.exports = router;