const addPlayerToPlayers = (socketId, playerName, players) => {
    const player = { id: socketId, name: playerName, score: 0 };
    const newPlayers = players;
    newPlayers.push(player);
    return newPlayers;
};
module.exports = addPlayerToPlayers;
