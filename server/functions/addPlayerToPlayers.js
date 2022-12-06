const addPlayerToPlayers = (socketId, playerName, players) => {
    const player = { id: socketId, name: playerName };
    const newPlayers = players;
    newPlayers.push(player);
    return newPlayers;
};
