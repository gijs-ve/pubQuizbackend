//takes an answerId, player, roomId and the roomsList from the server state
//returns the new roomState
const findRoomByRoomId = require('./findRoomByRoomId');
const setAnswerFromPlayer = (answer, player, roomId, roomState) => {
    const room = findRoomByRoomId(roomId, roomState);
    const newPlayerList = room.players.map((i) => {
        if (room.roomStatus !== 'question') return i;
        if (i.id === player.id) {
            return { ...i, currentAnswer: answer };
        }
        return i;
    });
    const newRoomState = roomState.map((i) => {
        if (i.roomId !== roomId) return i;
        return { ...i, players: newPlayerList };
    });
    console.log(room.players);
    return newRoomState;
};
module.exports = setAnswerFromPlayer;
