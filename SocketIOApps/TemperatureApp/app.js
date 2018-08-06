const port = process.env.PORT || 4001;
const express = require("express");
const app = express();
const server = require("http").createServer(app);

// Setups the socketIO to listen to the server
// for socket connections
const socketio= require("socket.io").listen(server);

const axios = require("axios");


const index = require("./routes/index");

app.use(index);

const getApiAndEmit = "TODO"

server.listen(port, () => console.log(`Listening on port ${port}`))
