//takes an answerId, player, roomId and the roomsList from the server state
//returns the new roomState
const setAnswerFromPlayer = (answer, player, roomId, roomState) => {
    const room = findRoomByRoomId(roomId, roomState);
    const newPlayerList = room.players.map((i) => {
        if (room.status !== 'questions') return i;
        if (i.id === player.id) {
            return { ...i, currentAnswer: answer };
        }
        return i;
    });
    room.players = newPlayerList;
    const newRoomState = roomState.map((i) => {
        if (i.id !== roomId) return i;
        return room;
    });
    return newRoomState;
};
modules.export = setAnswerFromPlayer;
