const SportsModel = require("../model/sports")

function Sportses(){
    return SportsModel.find({})
}
function Sports(obj, args, context, info){
    return SportsModel.findOne({ title : obj.title})
}

function AddSports(obj, args, context, info){
    const Sports = new SportsModel({
        title : obj.title,
        description : obj.description,
        url : obj.url,
        urltoimage : obj.urltoimage
    })
    return Sports.save();
}

module.exports = { Sportses, Sports, AddSports};