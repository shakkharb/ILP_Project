const express = require("express");
const Router = express.Router();
const SportsModel = require("../model/sports");
const {checkSportstitle} = require("../validator")


Router.get("/addsports", (req, res) => {
    res.render("add-sports", {});
});

Router.get("/", (req, res) => {
    SportsModel.find().then((response) => {
        res.render("sportslist", {
            posts: response
        });
    })
});

Router.post("/addsports", (req, res) => {

    if (req.body.stitle !== "" && checkSportstitle(req.body.stitle) && req.body.sdescription !== "" && req.body.surl !== "" && req.body.surltoimage !== "") {
        const Sports = new SportsModel({
            stitle: req.body.stitle.trim(),
            sdescription: req.body.sdescription.trim(),
            surl: req.body.surl.trim(),
            surltoimage: req.body.surltoimage.trim()
        })
        Sports.save();
        res.send("Sports has been added...");
    } else {
        res.send("input is invalid.");
    }
});

module.exports = Router;