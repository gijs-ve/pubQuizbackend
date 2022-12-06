const sendRoomStateToRoom = (room, io) => {
    //const convertedRoom = STUFF TO DELETE QUESTIONS STUFF
    room.players.map((i) => {
        io.to(i.id).emit('roomUpdate', room);
    });
};

module.exports = sendRoomStateToRoom;
