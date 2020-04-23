const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const SportsSchema = new Schema({
    title: String,
    description : String,
    url : String,
    urltoimage : String,
    createdOn : {type : Date, default : Date.now },
})

const SportsModel = new mongoose.model("sports", SportsSchema);

module.exports = SportsModel;