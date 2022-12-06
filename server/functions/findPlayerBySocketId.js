const findPlayerBySocketId = (socketId, players) => {
    return players.find(i => i.id === socketId)
}
module.exports = findPlayerBySocketId