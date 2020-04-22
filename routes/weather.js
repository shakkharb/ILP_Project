const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.render("weather")
})

Router.get("/:lat/:long", (req, res) => {
    let request = require('request');

    let apiKey = 'bd961ca2348c73ad7c90071bbf8739e0';
    //let city = 'Athens';
    let lat = 0;
    let long = 0;
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.long}&units=imperial&appid=${apiKey}`
    
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        let weather = body;
        res.send(weather)
        //let message = `It's ${weather.main.temp} \xB0 F in ${weather.name}!`;
        //res.send(message)
        //res.render(weather, {greeting: message})
    })

})

module.exports = Router;