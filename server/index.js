const corsMiddleWare = require('cors');
const { Server } = require('socket.io');
const PORT = 4000;

//Server setup
const express = require('express');
const app = express();

// Socket setup
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

let rooms = []
let players = []

app.use(corsMiddleWare());
app.use(express.json());

//Every socket.on and socket.emit needs to be wrapped around "io.on('connection, socket)"
io.on('connection', (socket) => {
    socket.on('joinRoom', (socket, roomId) => {

    });

    //event when client wants to host a game
    socket.on('createRoom', (socket) => {
        
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = server;