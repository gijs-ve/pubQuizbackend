const sendRoomStateToRoom = (room, io) => {
    const { roomId, currentQuestion, host, players, timer, roomStatus } = room;
    const convertedRoom = {
        roomId,
        currentQuestion,
        host,
        players,
        timer,
        roomStatus,
    };
    room.players.map((i) => {
        io.to(i.id).emit('roomUpdate', convertedRoom);
    });
};

module.exports = sendRoomStateToRoom;
