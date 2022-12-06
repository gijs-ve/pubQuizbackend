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

//Functions
const addPlayerToPlayers = require('/functions/addPlayerToPlayers');
const addPlayerToRoom = require('/functions/addPlayerToRoom');
const findPlayerBySocketId = require('/functions/findPlayerBySocketId');
const createRoom = require('/functions/createRoom');

let rooms = [];
let players = [];

app.use(corsMiddleWare());
app.use(express.json());

//Every socket.on and socket.emit needs to be wrapped around "io.on('connection, socket)"
io.on('connection', (socket) => {
    players = addPlayerToPlayers(socketId, 'noName', players);
    socket.on('joinRoom', (roomId) => {
        const player = findPlayerBySocketId(socket.id);
        rooms = addPlayerToRoom(player, roomId, rooms);
        io.emit('roomUpdate', rooms);
    });

    //event when client wants to host a game
    socket.on('createRoom', (info) => {
        console.log(info);
        const player = findPlayerBySocketId(socket.id);
        rooms = createRoom(info, player, rooms);
        io.emit('roomUpdate', rooms);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = server;
