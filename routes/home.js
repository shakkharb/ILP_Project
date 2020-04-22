const express = require("express");
const Router = express.Router();
const NewsModel = require("../model/news");
const { checkNewstitle } = require("../validator")

Router.get("/", (req, res) => {
    NewsModel.find().then((response)=>{
        res.render("home", { posts : response });
    })
});

Router.post("/", (req, res)=>{

    if(req.body.title !== "" && checkNewstitle(req.body.title) &&  req.body.description !== "" && req.body.url !== "" && req.body.urltoimage !== "")
        {
            const News = new NewsModel({
                title : req.body.title.trim(),
                description : req.body.description.trim(),
                url : req.body.url.trim(),
                urltoimage : req.body.urltoimage.trim()
            })
            News.save();
            res.send("news has been added...");
        }
    else
        {
            res.send("input is invalid.");
        }
});

module.exports = Router;

module.exports = Router;