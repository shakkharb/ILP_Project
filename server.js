const application = require("./application");
const express = require("express");
const port = 9001;
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost:27017/FinalProject", { useNewUrlParser: true });

//login stuff
const app = require("./app");
const expressLog =  require("express");
const portLog = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app(expressLog.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) =>{
    res.render('index', {error: req.query.valid?req.query.valid:''})
})

app.get('/', (req, res) =>{
    sess=req.session;
    sess.email=' ';
    console.log(">>>>", sess.email);
    res.render('index', {error: req.query.valid?req.query.valid:'',
                            msg: req.query.msg?req.query.msg:''})
});

app.get('/signup', (req, res) => {
    res.render('signup')
})

const serverLog = app.listen(portLog, () =>{
    console.log("Exporess server listening on port" + portLog);
});
//end of login stuff
const server = application.listen(port, ()=>{
    console.log(`...Server running on localhost:` + port);
})

require("@babel/register")({ presets : ["@babel/preset-env"] });
module.exports = require("./chatapp");//////