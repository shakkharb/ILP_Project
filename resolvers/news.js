const NewsModel = require("../model/news")

function Newses()
    {
        return NewsModel.find({})
    }

function News(obj, args, context, info)
    {   
        
        return NewsModel.findOne({ title : obj.title })
    }


function AddNews(obj, args, context, info)
    {   
        const News = new NewsModel({
            title : obj.title,
            description : obj.description,
            url : obj.url,
            urltoimage : obj.urltoimage
        })
    
        return News.save();
    }

module.exports = { Newses, News, AddNews };