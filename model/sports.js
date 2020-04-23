const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const SportsSchema = new Schema({
    stitle: String,
    sdescription : String,
    surltoimage : String,
    screatedOn : {type : Date, default : Date.now },
})

const SportsModel = new mongoose.model("sports", SportsSchema);

module.exports = SportsModel;