var express = require('express');
var router = express.Router();
// for parsing form
var bodyParser = require('body-parser');
// for gening Token
var jwt = require('jsonwebtoken');
// For encrypting Password
var bcrypt = require('bcryptjs');
// For Secret token
var config = require('../config');
// For User Schema
var User = require('../user/User');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Create User
router.post('/register', function(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    },
    function (err, user){
        if (err) return res.status(500).send("There was a problem registering");
        // create a token
        var token = jwt.sign({ id: user_id }, config.secret, {
            expiresIn: 86400 //expires in 24 hours
        });
//        res.status(200).send({ auth: true, token: token});
        const string = encodeURIComponent("Success fully register please login");
        res.redirect('/?msg=' + string); // send a message when the user is successfully logged in make use of the res.redirect
    });
});

// Login User
router.post('/login', function(req, res) {
    User.findOne({email: req.body.email }, function (err, user) {
        if(err) return res.status(500).send('Error on the server');
        const string = encodeURIComponent('! Please enter valid value');
        if(!user) {res.redirect('/?valid=' + string);} // if the email id is not valid send the message back to the user to enter a valid email id
        else{
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({auth: false, token: null});
            var token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            //res.send({auth: true, token : token});
            //send a response of the authentication being true and the token
            //res.redirect('/users/profile'); // when the user is successfully logged in move him to the profile page    
            localStorage.setItem('authtoke', token)
            res.redirect('/users/profile');  
        }
    });
});

//Check to see if user is logged in
router.get('/loginedUser', function(req, res){
    var token = req.headers['x-access-token'];
    //use x-access-toke header to send the token
    if(!token) return res.status(401).send({ auth: false, message: 'No token provided'});

    jwt.verify(token, config.secret, function(err, decoded){
        if(err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token'});

        User.findById(decoded.id, { password: 0}, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if(!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        })
    })
})

// GETS A SINGLE USER FROM THE DATABASE
router.get('/profile', function(req, res) {
    var token = localStorage.getItem('authtoken')
    console.log("token>>>", token)
    if(!token) {
        res.redirect('/')
    }
    jwt.verify(token, config.secret, function(err, decoded){
        if (err) {
            res.redirect('/')
        };
        User.findById(decoded.id, {password: 0}, function (err, user) {
            if(err) {res.redirect('/')}
            if(!user) {res.redirect('/')}
            res.render('profile.ejs',{user})
        });
    });
});

router.get('/signup', (req, res) =>{
    res.render('signup.ejs')
});

router.get('/logout', (req, res) =>{
    localStorage.removeItem('authtoken');
    res.redirect('/');
});