const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username : { type : String, unique : true},
    password : String,
    email : { type : String, unique : true},
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;