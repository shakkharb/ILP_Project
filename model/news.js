const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const NewsSchema = new Schema({
    title : String,
    description : String, 
    urltoimage : String,
    createdOn : { type : Date, default : Date.now },
})

const NewsModel = new mongoose.model("news", NewsSchema);

module.exports = NewsModel;