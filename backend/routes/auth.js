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

// Login 
router.route('/login').get((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.find({"username": username}, function(err, result){
        if(err){
            res.status(400).json(err)
        }
        else{
            if(result.length !== 1){res.status(400).json({"result": "Account not found"})}
            else{
                const verify = bcrypt.compareSync(password, result[0].hashedPassword);
                if(!verify){res.status(400).json({"result": "Incorrect information"})}
                else{
                    token = generateAccessToken(username);
                    res.status(200).json(token);
                }
            }
        }
    })
})

module.exports = router;