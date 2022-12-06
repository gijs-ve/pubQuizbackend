//Remove a question from the question array that is inside the room
//Returns the question and the new rooms
const extractQuestion = (roomId, rooms) => {
    const findRoomByRoomdId = require('./findRoomByRoomdId')
    const room = findRoomByRoomId(roomdId, rooms)
    const {questions } = room

}