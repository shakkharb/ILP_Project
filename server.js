const express = require("express")
const application = require("./application");
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost:27017/FinalProject", { useNewUrlParser: true })
const port = 9001;

///////////////////////////////////////////

// const ejs = require("ejs");
// const expressGraphQL = require("express-graphql");
// const schema = require("./schema");
// const Resolvers = require("./resolvers");
// const news = require("./routes/news")

// app.use("/graphql", expressGraphQL({
//     schema : schema,
//     graphiql : true,
//     rootValue : Resolvers,
    
// }))

// app.use("/news", news);

/////////////////////////////////////////////////////


const server = application.listen(port, ()=>{
    console.log(`...Server running on localhost:${port}...`);
})

require("@babel/register")({ presets : ["@babel/preset-env"] });
module.exports = require("./chatapp");//////