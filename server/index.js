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

let tournaments = [];
let games = [];
let users = [];

app.use(corsMiddleWare());
app.use(express.json());

//Every socket.on and socket.emit needs to be wrapped around "io.on('connection, socket)"
io.on('connection', (socket) => {
    console.log('CONNECTED', socket.id);
    users.push(socket.id);
    console.log(users);
    socket.on('joinTournament', (name, tournamentId) => {});

    //event when client is sending an input direction to the server
    socket.on('sendInput', (direction) => {});
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = server;