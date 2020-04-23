import express from "express";
import path from "path";
import http from "http";
import socketio from "socket.io";

// const application = express();
const socketUsers = {};
///////////////////////////////////////////
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


const server = http.createServer(application)(port, ()=>{
    console.log(`...Server running on localhost:${port}...`);
})

/////////////////////////////////////////////////////////////////

import express from "express";
import path from "path";
import http from "http";
import socketio from "socket.io";

const application = express();
const socketUsers = {};

application.use(express.static(path.join(__dirname, "views")))

const server = http.createServer(application).listen(9002, () => {
    console.log("...Chat app started on localhost:9002...");
})

const SocketInstance = socketio.listen(server);

SocketInstance.sockets.on("connection", (socket) => {
    var list = SocketInstance.sockets.sockets;
    var user = Object.keys(list);

    socket.on("signin", (name) => {
        socketUsers[socket] = { name : name }
        socket.emit("userloggedin", user)
    })

    socket.on("chat", (message) => {
        socket.emit("chat", { sendBy : socketUsers[socket], message })
        socket.broadcast.emit("chat", { sentBy : socketUsers[socket], message })
    })

})



require("@babel/register")({ presets : ["@babel/preset-env"] });
module.exports = require("./application");//////