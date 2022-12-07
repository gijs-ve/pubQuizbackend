const sendRoomStateToRoom = (room, io) => {
    const {
        roomId,
        currentQuestion,
        host,
        players,
        timer,
        roomStatus,
        previousAnswer,
    } = room;
    const convertedRoom = {
        roomId,
        currentQuestion,
        host,
        players,
        timer,
        roomStatus,
        previousAnswer,
    };
    room.players.map((i) => {
        io.to(i.id).emit('roomUpdate', convertedRoom);
    });
};

module.exports = sendRoomStateToRoom;
