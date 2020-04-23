const express = require("express");
const Router = express.Router();
const SportsModel = require("../model/sports");
const {
    checkSportstitle
} = require("../validator")


Router.get("/", (req, res) => {
    res.render("add-sports", {});
});

Router.get("/sportslist", (req, res) => {
    SportsModel.find().then((response) => {
        res.render("sportslist", {
            posts: response
        });
    })
});

Router.post("/", (req, res) => {

    if (req.body.title !== "" && checkSportstitle(req.body.title) && req.body.description !== "" && req.body.url !== "" && req.body.urltoimage !== "") {
        const Sports = new SportsModel({
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            url: req.body.url.trim(),
            urltoimage: req.body.urltoimage.trim()
        })
        Sports.save();
        res.send("Sports has been added...");
    } else {
        res.send("input is invalid.");
    }
});

module.exports = Router;