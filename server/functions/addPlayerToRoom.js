const addPlayerToRoom = (player, roomId, rooms) => {
    const roomToJoin = rooms.find(i => i.roomId === roomId)
    roomToJoin.push(player)
    const newRooms = rooms.map(i => {
        if (i.roomId === roomId) return roomToJoin
        return i
    })
    return newRooms
}
module.exports = addPlayerToRoom
