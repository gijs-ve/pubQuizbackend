const findRoomByRoomId = (roomId, roomState) => {
    return roomState.find((i) => i.roomId === roomId);
};
module.exports = findRoomByRoomId;
