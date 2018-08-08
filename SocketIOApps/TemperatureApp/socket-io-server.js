/*
The app will get the current temperature at a location and update it
every 10 seconds in our webpage

The server will use Socket.IO to emit a message every 10 seconds and
the client will listen for the same message over a real-time socket

How does Socket.IO work

The most important method is the Socket.IO on() method
The on() method takes two arguments:
---1. The name of the event, example "connection"
---2. A callback which will be executed after every connection event.
on() is nothin more than a core Node.js method tied to the EventEmitter
class.

The connection event returns a socket object which will be passed to the
callback function. By using said socket you will be able to send data 
back to the client in real time.

Since we want to know the temperature every 10 seconds: we can use
setInterval() inside the callback, and inside setInterval we can use
another arrow function which will call the getApiAndEmit function below
*/

const port = process.env.PORT || 4001;
const express = require("express");
const app = express();
const server = require("http").createServer(app);

// Setups the socketIO to listen to the server
// for socket connections
const socketio= require("socket.io").listen(server);

// Axios will be used to make HTTP requests to the Darksky API
const axios = require("axios");

// The route will come from the routes directory
const index = require("./routes/index");

// The app.use() will serve the index route.
app.use(index);


// This is where will be setting up the {socket}io.on("connection",callback)
// Every time some connects to our server, we will send back a callback
// that will automatically update the temperature on that client
// every 10 seconds. 
//  We will write two versions of code to do this.
//  Version 1 will have an interval for everyone that visits the page
//  Version 2 will have one interval and everyone that visits the page will
//       share the same interval

// Version 1
/*
socketio.on("connection", (socket)=>{

    console.log("New client connected");
    setInterval(() => getApiAndEmit(socket), 10000);

    socket.on("disconnect", () => console.log("Client disconnected"));
});
*/

// Version 1a
/* This version doesnt work because the 'socket' variable in the call
   to setInterval will be undefined.
socketio.on("connection", (socket)=>{

    console.log("New client connected");
    setInterval( (socket) => getApiAndEmit(socket), 10000);

    socket.on("disconnect", () => console.log("Client disconnected"));
});
*/

// Version 2
// This version will clear the interval upon subsequent connections

let interval;
socketio.on("connection", (socket)=>{
    console.log("New Client connected");
    // setInterval
    if(interval){
        clearInterval(interval);
    }
    interval = setInterval( () => getApiAndEmit(socket), 10000);

    socket.on("disconnect", () => {
        console.log("The client disconnected");
    });

});



// This will pull the temperature from the DarkSky.net website
const getApiAndEmit = async socket => {
    try {
        /* example request
        const res = await axios.get(
            "https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558"
        ); // Getting the data from DarkSky.net
        */
        const res = await axios.get(
            "https://api.darksky.net/forecast/8b7553ab8309ec0b732a5d1c074f3e8e/43.7695,11.2558"
        );// Getting the data from DarkSky.net
        socket.emit("FromAPI", res.data.currently.temperature);
        // Emitting a new message, this will be handled by the client
        // The client will be looking for the "FromAPI" event

    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};


/*
const getApiAndEmit = socket => {
    console.log(`The api was called on:\n ${socket}`);
    socket.emit("FromAPI", { response : "You have got the response" })
};
*/
server.listen(port, () => console.log(`Listening on port ${port}`))
