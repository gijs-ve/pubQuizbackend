//creates a new room and returns the new room list
const createRoom = (createInfo, player, rooms) => {
  const { uuid } = require('uuidv4');
 const {quiz, playerCount} = createInfo
   const newRoom = {roomId: uuid(), host: player, players:[], roomState: "preLoad", questions: quiz}
    const newRooms = rooms
   newRooms.push(newRoom)
   return newRooms

}
module.exports = createRoom