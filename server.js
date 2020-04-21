const express = require("express")
const application = require("./application");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/FinalProject", { useNewUrlParser: true })
const port = 9001;



const server = application.listen(port, ()=>{
    console.log(`...Server running on localhost:${port}...`);
})

require("@babel/register")({ presets : ["@babel/preset-env"] });
module.exports = require("./chatapp");