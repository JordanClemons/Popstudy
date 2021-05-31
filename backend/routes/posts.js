const router = require('express').Router();
const jwt = require('jsonwebtoken');
let Post = require('../schemas/post.schema')

// Create post
router.route('/create').post((req, res) =>{
    var token = req.headers['authorization'];
    const bearer = token.split(' ');
    const bearerToken = bearer[1];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      else{
        creator = decoded.username;
        private = req.body.private;
        likes = 0;
        datePosted = Date.now();
        content = req.body.content;
        const newPost = new Post({
            creator, private, likes, datePosted, content
        })
        newPost.save()
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => res.status(400).json(err));
      }
    });
});

module.exports = router;