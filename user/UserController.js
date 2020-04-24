var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
var User = require('./User');

// Returns all the users in the database
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if(err) return res.status(500).send("There was a problem finding users")
        res.status(200).send(users);
    });
});

module.exports = router;