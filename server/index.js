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
const countDown = require('./functions/countDown');
const findRoomByRoomId = require('./functions/findRoomByRoomId');
const findPlayerBySocketId = require('./functions/findPlayerBySocketId');
const sendRoomStateToRoom = require('./functions/sendRoomStateToRoom');

let roomState = [];
let players = [];
let timer = 0;

//every second, the timer is decreased by 1 if necessary
//by the countDown function
const raiseTimer = () => {
    roomState = countDown(roomState, io);
};
setInterval(raiseTimer, 1000);

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
            //send the new roomState to everyone in the room
            sendRoomStateToRoom(room, io);
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
            const { newRoomState, room } = createRoom(
                host,
                questions,
                roomState,
            );
            roomState = newRoomState;
            //we send this new roomState to everyone that is connected
            //to the newly created room
            //socket.emit('roomUpdate', roomState);
            sendRoomStateToRoom(room, io);
        } catch (error) {
            console.log(error);
        }
    });

    //event to handle the start of the game by the host
    socket.on('startGame', (data) => {
        const { roomId } = data;
        roomState = onStartGame(roomId, roomState, io);
    });

    //event to handle the client choosing an answer. May be called by client multiple times until timer runs out
    //in order to refresh their answer
    socket.on('lockAnswer', (data) => {
        const { answer, roomId } = data;
        const player = findPlayerBySocketId(socket.id);
        roomState = setAnswerFromPlayer(answer, player, roomId, roomState);
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
