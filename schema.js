const { buildSchema } = require("graphql")

const ApplicationSchema = buildSchema(`

    type Query {
        newses : [News],
        news(title : String) : News
        contactus(qemail : String) : Contactus
    }

    type News {
        title : String,
        description : String,
        url : String,
        urltoimage : String,
        _id : String
                
    }

    
    type Contactus {
        qemail : String,
        query : String,
        _id : String
              
    }

    type Mutation {
        addNews(title : String, description : String, url : String, urltoimage : String) : News
        contactUs(qemail : String, query : String) : Contactus
    }

`);

module.exports = ApplicationSchema;