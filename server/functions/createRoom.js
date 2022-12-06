//creates a new room and returns the new roomState, based on the old roomState
const createRoom = (host, questions, roomState) => {
    const { v4: uuidv4 } = require('uuid');
    const newRoom = {
        roomId: uuidv4().split('-')[0],
        host,
        players: [],
        roomState: 'preLoad',
        questions: questions,
    };
    const newRooms = roomState;
    newRooms.push(newRoom);
    return newRooms;
};
module.exports = createRoom;
