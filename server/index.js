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
const addPlayerToPlayers = require('./functions/addPlayerToPlayers');
const addPlayerToRoom = require('./functions/addPlayerToRoom');
const createRoom = require('./functions/createRoom');
const findRoomByRoomId = require('./functions/findRoomByRoomId');
const findPlayerBySocketId = require('./functions/findPlayerBySocketId');
const sendRoomStateToRoom = require('./functions/sendRoomStateToRoom');

let roomState = [];
let players = [];

app.use(corsMiddleWare());
app.use(express.json());

//Every socket.on and socket.emit needs to be wrapped around "io.on('connection, socket)"
io.on('connection', (socket) => {
    socket.on('joinRoom', (data) => {
        try {
            //retrieve the code (a roomId) and name from the data that
            //was sent
            const { code, name } = data;
            const roomId = code;
            //use the old playerState, and add the new player with their
            //socketId and the name from the client input
            players = addPlayerToPlayers(socket.id, name, players);
            const player = findPlayerBySocketId(socket.id, players);
            //add the newly created player to the room, using the
            //old roomState and declaring the new roomState
            roomState = addPlayerToRoom(player, roomId, roomState);
            //find the room that we require to send the data to
            room = findRoomByRoomId(roomId, roomState);
            //sent the new roomState to everyone
            sendRoomStateToRoom(roomState, room, io);
            // io.emit('roomUpdate', roomState);
        } catch (error) {
            console.log(error);
        }
    });

    //event when client wants to host a game
    socket.on('createRoom', (data) => {
        try {
            //retrieve the name and questions from the data that is sent
            //through createRoom
            const { name, questions } = data;
            //the new playerState (stored in the let players)
            //gets updated with the dedicatd function
            players = addPlayerToPlayers(socket.id, name, players);
            //inside the now updated playerState, we search for the host
            const host = findPlayerBySocketId(socket.id, players);
            //we update the roomState with the createRoom function
            //and provide it with the newly added player, now host,
            //the questions
            //and the old roomState
            roomState = createRoom(host, questions, roomState);
            //we send this new roomState to everyone that is connected
            socket.emit('roomUpdate', roomState);
        } catch (error) {
            console.log(error);
        }
    });

    //event to handle the client choosing an answer. May be called by client multiple times until timer runs out
    //in order to refresh their answer
    socket.on('lockAnswer', (answerId, roomId) => {
        const player = findPlayerBySocketId(socket.id);
        roomState = setAnswerFronPlayer(answerId, player, roomId, roomState);
    });

    //development event to get the rooms and players displayed in terminal
    socket.on('getData', () => {
        try {
            console.log(roomState);
            console.log(players);
        } catch (error) {
            console.log(error);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = server;
