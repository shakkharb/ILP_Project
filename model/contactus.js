const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ContactusSchema = new Schema({
    qemail : { type : String, unique : true},
    query : String, 
    submittedOn : { type : Date, default : Date.now },
})

const ContactusModel = new mongoose.model("contactus", ContactusSchema);

module.exports = ContactusModel;