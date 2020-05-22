// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var serveStatic = require('serve-static');  // serve static files
var socketIo = require("socket.io");        // web socket external module
             // EasyRTC external module

// Set process name
process.title = "node-easyrtc";


var port = process.env.PORT || 8080;

var app = express();
app.use(express.static('public'));



app.get('/dash', function(request, response) {
  response.sendFile(__dirname + '/public/dash.html');
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});


const webServer = http.createServer(app);
const io = require("socket.io")(webServer);

// const rooms = {};

// io.on("connection", socket => {
//   console.log("user connected", socket.id);

//   let curRoom = null;

//   socket.on("joinRoom", data => {
//     const { room } = data;

//     if (!rooms[room]) {
//       rooms[room] = {
//         name: room,
//         occupants: {},
//       };
//     }

//     const joinedTime = Date.now();
//     rooms[room].occupants[socket.id] = joinedTime;
//     curRoom = room;

//     console.log(`${socket.id} joined room ${room}`);
//     socket.join(room);

//     socket.emit("connectSuccess", { joinedTime });
//     const occupants = rooms[room].occupants;
//     io.in(curRoom).emit("occupantsChanged", { occupants });
//   });

//   socket.on("send", data => {
//     io.to(data.to).emit("send", data);
//   });

//   socket.on("broadcast", data => {
//     socket.to(curRoom).broadcast.emit("broadcast", data);
//   });

//   socket.on("disconnect", () => {
//     console.log('disconnected: ', socket.id, curRoom);
//     if (rooms[curRoom]) {
//       console.log("user disconnected", socket.id);

//       delete rooms[curRoom].occupants[socket.id];
//       const occupants = rooms[curRoom].occupants;
//       socket.to(curRoom).broadcast.emit("occupantsChanged", { occupants });

//       if (occupants == {}) {
//         console.log("everybody left room");
//         delete rooms[curRoom];
//       }
//     }
//   });
// });


//listen on port
webServer.listen(port, function () {
    console.log('listening on http://localhost:' + port);
});
