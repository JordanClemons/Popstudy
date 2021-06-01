const router = require('express').Router();
const jwt = require('jsonwebtoken');
let Post = require('../schemas/post.schema')

// Get all public posts
router.route('/').get((req, res) =>{
  var token = req.headers['authorization'];
  const bearer = token.split(' ');
  const bearerToken = bearer[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    else{
      Post.find({private: false}, function (err, posts) {
        if (err){
            console.log(err);
        }
        else{
          res.send({allPosts:posts})
        }
    });
    }
  });
});

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

// Get my posts
router.route('/me').get((req, res) =>{
  var token = req.headers['authorization'];
  const bearer = token.split(' ');
  const bearerToken = bearer[1];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    else{
      Post.find({creator: decoded.username}, function (err, posts) {
        if (err){
            console.log(err);
        }
        else{
          res.send({allPosts:posts})
        }
    });
    }
  });
});

// Delete a post
router.route('/delete').delete((req, res) =>{
  var token = req.headers['authorization'];
  const bearer = token.split(' ');
  const bearerToken = bearer[1];
  const id = req.body.id;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    else{
      Post.findOneAndDelete({_id: id, creator: decoded.username}, function (err, post) {
        if(err) console.log(err);
          res.status(200).json(post);
      });
    }
  });
});

module.exports = router;