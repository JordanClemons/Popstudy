const router = require('express').Router();


// Create account
router.route('/create').post((req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    console.log(req.body)
    // res.json('User added');
})

module.exports = router;