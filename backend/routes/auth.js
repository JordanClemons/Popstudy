const router = require('express').Router();
let User = require('../schemas/user.schema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate a token expires in 24 hours
function generateAccessToken(username) {
    var token = jwt.sign({username: username}, process.env.JWT_SECRET, { expiresIn: '24hr' });
    return token;
  }

// Hashes the password
function hashPW(password) {
    var hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
}

// Create account
router.route('/create').post((req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = hashPW(password);

    const newUser = new User({username, hashedPassword, email});

    token = generateAccessToken(username);

    newUser.save()
        .then(() => {
            res.status(200).json(token);
        })
        .catch(err => res.status(400).json(err));
});

// Test func - Shows how to get info from token
// router.get('/test', function(req, res) {
//     var token = req.headers['authorization'];
//     const bearer = token.split(' ');
//     const bearerToken = bearer[1];
//     if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
//     jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
//       if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
//       res.status(200).send(decoded);
//     });
//   });

module.exports = router;