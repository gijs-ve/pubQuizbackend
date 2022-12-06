const findRoomByRoomId = (roomId, rooms) => {
    return (rooms.find(i => i.roomId = roomId))
}