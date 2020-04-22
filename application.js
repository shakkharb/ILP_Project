const express = require("express");
const app = express();
const UserRoutes = require("./routes/user");
const HomeRoutes = require("./routes/home");
const WeatherRoutes = require("./routes/weather");

const NewsRoutes = require("./routes/news");

const application = express();
const path = require("path")
const bodyParser = require("body-parser");

///////////////////////////////////////////////////

const ejs = require("ejs");
const expressGraphQL = require("express-graphql");
const schema = require("./schema");
const Resolvers = require("./resolvers")
const news = require("./routes/news")

///////////////////////////////////////////////////////

application.set("view engine", "ejs");
application.set("views", path.join(__dirname, "./views"));

// Getting body information for JSON and Form data.
application.use(bodyParser.json({ type : "application/json" }))
application.use(bodyParser.text({ type : "text/html" }))
application.use(bodyParser.urlencoded({ extended : true }))

// handling for user routes.
application.use("/user", UserRoutes);
application.use("/home", HomeRoutes);
application.use("/weather", WeatherRoutes);
application.use("/news", NewsRoutes);

/////////////////////////////////////
app.use("/graphql", expressGraphQL({
    schema : schema,
    graphiql : true,
    rootValue : Resolvers,
    
}))

///////////////////////////////////////////////////

// default export
module.exports = application;

