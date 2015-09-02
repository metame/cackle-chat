var router = require('express').Router();

router.get('/', (req, res) => {
   res.render('index', {title: "A chat app with Node, Socket.io, & Redis", room: "Main Room"});
});

module.exports = router;