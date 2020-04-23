const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Config = require("../config")

Router.get("/", (req, res) => {
    res.send([])
})




Router.get("/signup", (req, res) => {
    res.render("signup")
})

// Store data in mongo.
Router.post("/signup", async (req, res) => {
   
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User = UserModel.create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
    },
    function (err, user){
            if (err) return res.status(500).send("there was a problem registering the user.")
    });
  
    res.send({ message: "user created successfully." })


})






Router.get("/login", (req, res) => {
    res.render("login")
})

Router.post("/login", (req, res) => {
    var mypriv = 0;
    UserModel.findOne({ email: req.body.email }, (err, user) => {
        if (err) 
        { 
            console.log("invalid 1")
            return res.status(500).send({ message: "error on server." }) 
        }
        if (!user) { 
            console.log("invalid 2")
            return res.status(500).send({ message: "error on server." }) 
        }
        if (user == null) { 
            console.log("invalid 3")
            return res.status(500).send({ message: "error on server." }) 
        }
        var mypriv = 1;
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        console.log("")

        if (passwordIsValid) {
            if(req.body.email == "admin@admin.com"){
                const token = jwt.sign({ id : user._id }, Config.SECRET_KEY, {
                    expiresIn : 86400
                })

                mypriv = 3

                console.log("admin logged in")

                res.send({ token : token })

                
            }
            else{
            const token = jwt.sign({ id : user._id }, Config.SECRET_KEY, {
                expiresIn : 86400
            })

            mypriv = 2
            res.send({ token : token })
            console.log("user logged in")

        }


        }
        else {
            res.send({ messge : "invalid user." })
        }

    })

    console.log(mypriv)
});

Router.post("/whoami", (req, res)=>{
    const token = req.headers["x-access-token"];
    if(!token){ res.status(401).send({ message : "no token found in request." }) };

    jwt.verify(token, Config.SECRET_KEY, (err, decoded)=>{
        UserModel.findById(decoded.id, { password : false }, (err, user)=>{
            console.log(user);
            res.send(user);
        })
    })

})

Router.post("/logout", (req, res) => {
    res.send({
        message: "User successfully logged out."
    })
})

module.exports = Router;