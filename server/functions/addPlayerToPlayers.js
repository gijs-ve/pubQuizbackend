const addPlayerToPlayers = (socketId, playerName, imageUrl, players) => {
    const player = {
        id: socketId,
        name: playerName,
        score: 0,
        currentAnswer: '',
        imageUrl: imageUrl,
    };
    const newPlayers = players;
    newPlayers.push(player);
    return newPlayers;
};
module.exports = addPlayerToPlayers;
