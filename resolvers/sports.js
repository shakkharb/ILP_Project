const SportsModel = require("../model/sports")

function Sportses(){
    return SportsModel.find({})
}
function Sports(obj, args, context, info){
    return SportsModel.findOne({ title : obj.stitle})
}

function AddSports(obj, args, context, info){
    const Sports = new SportsModel({
        stitle : obj.stitle,
        sdescription : obj.sdescription,
        surl : obj.surl,
        surltoimage : obj.surltoimage
    })
    return Sports.save();
}

module.exports = { Sportses, Sports, AddSports};