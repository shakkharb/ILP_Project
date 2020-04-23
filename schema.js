const { buildSchema } = require("graphql")

const ApplicationSchema = buildSchema(`

    type Query {
        newses : [News],
        news(title : String) : News 
        sportses : [Sports],
        sports(title : String) : Sports
        contactus(qemail : String) : Contactus
    }

    type News {
        title : String,
        description : String,
        url : String,
        urltoimage : String,
        _id : String
                
    }

    type Sports {
        stitle : String,
        sdescription : String,
        surl : String,
        surltoimage : String,
        _id : String
    }

    
    type Contactus {
        qemail : String,
        query : String,
        _id : String
              
    }

    type Mutation {
        addNews(title : String, description : String, url : String, urltoimage : String) : News
        addSports(stitle : String, sdescription : String, surl : String, surltoimage : String) : Sports
        contactUs(qemail : String, query : String) : Contactus
    }

`);

module.exports = ApplicationSchema;