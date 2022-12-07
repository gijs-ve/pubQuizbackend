const findPlayerBySocketId = (socketId, players) => {
    if (!players || players.length === 0) return false;
    return players.find((i) => i.id === socketId);
};
module.exports = findPlayerBySocketId;
