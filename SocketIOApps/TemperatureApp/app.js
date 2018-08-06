const express = require("express");
const app = express();
const server = require("http").createServer(app);

const socketio= require("socket.io").listen(server);

const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

