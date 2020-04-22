const { buildSchema } = require("graphql")

const ApplicationSchema = buildSchema(`

    type Query {
        newses : [News],
        news(title : String) : News
    }

    type News {
        title : String,
        description : String,
        url : String,
        urltoimage : String,
        _id : String
                
    }

    type Mutation {
        addNews(title : String, description : String, url : String, urltoimage : String) : News
    }

`);

module.exports = ApplicationSchema;