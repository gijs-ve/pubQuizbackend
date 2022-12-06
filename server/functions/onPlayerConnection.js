//Handles a player joining the socket connection
//Socket is added to playerList
//Returns the new playerList
const onPlayerConnection = (socketId, name, players) => {
    const playerList = players
    const player = {socketId, name}
    playerList.push({player})
    return playerList
}
module.exports = onPlayerConnection