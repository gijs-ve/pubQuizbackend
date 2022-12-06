const sendRoomStateToRoom = (roomState, room, io) => {
    room.players.map((i) => {
        io.to(i.id).emit('roomUpdate', roomState);
    });
};

module.exports = sendRoomStateToRoom;
