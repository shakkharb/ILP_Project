const express = require("express");
const Router = express.Router();
const ContactusModel = require("../model/contactus");
const { checkContactusqemail } = require("../validator")


Router.get("/", (req, res)=>{
    res.render("contactus", {});
});

Router.get("/querylist", (req, res)=>{
    ContactusModel.find().then((response)=>{
        res.render("querylist", { posts : response });
    })
});

Router.post("/", (req, res)=>{

    if(req.body.qemail !== "" && checkContactusqemail(req.body.qemail) &&  req.body.query !== "")
        {
            const Contactus = new ContactusModel({
                qemail : req.body.qemail.trim(),
                query : req.body.query.trim(),
            })
            Contactus.save();
            res.send("query has been submitted...");
        }
    else
        {
            res.send("input is invalid.");
        }
});

module.exports = Router;