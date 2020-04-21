const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Config = require("../config")

Router.get("/", (req, res) => {
    UserModel.find().then((response)=>{
        res.render("home", { posts : response });
    })
});

module.exports = Router;