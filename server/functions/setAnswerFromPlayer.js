//takes an answerId, player, roomId and the roomsList from the server state
//returns the new roomState
const setAnswerFronPlayer = (answerId, player, roomId, roomState) => {
    const room = findRoomByRoomId(roomId, roomState);
    const newPlayerList = room.players.map((i) => {
        if (room.status !== 'questions') return i;
        if (i.id === player.id) {
            return { ...i, answer: answerId };
        }
        return i;
    });
    room.players = newPlayerList;
    return room;
};
