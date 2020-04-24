const express = require("express");
const app = express();

const HomeRoutes = require("./routes/home");
const WeatherRoutes = require("./routes/weather");
const AboutusRoutes = require("./routes/aboutus");

const NewsRoutes = require("./routes/news");
const ContactusRoutes = require("./routes/contactus");
const SportsRoutes = require("./routes/sports");
const application = express();
const path = require("path")
const bodyParser = require("body-parser");

///////////////////////////////////////////////////

const ejs = require("ejs");
const expressGraphQL = require("express-graphql");
const schema = require("./schema");
const Resolvers = require("./resolvers")

///////////////////////////////////////////////////////

application.set("view engine", "ejs");
application.set("views", path.join(__dirname, "./views"));

// Getting body information for JSON and Form data.
application.use(bodyParser.json({
    type: "application/json"
}))
application.use(bodyParser.text({
    type: "text/html"
}))
application.use(bodyParser.urlencoded({
    extended: true
}))

// handling for user routes.

application.use("/home", HomeRoutes);
application.use("/weather", WeatherRoutes);
application.use("/news", NewsRoutes);
application.use("/aboutus", AboutusRoutes);
application.use("/contactus", ContactusRoutes);
application.use("/sports", SportsRoutes);
/////////////////////////////////////
app.use("/graphql", expressGraphQL({
    schema: schema,
    graphiql: true,
    rootValue: Resolvers,

}))

///////////////////////////////////////////////////

// default export
module.exports = application;
