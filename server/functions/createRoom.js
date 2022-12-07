//creates a new room and returns the new roomState, based on the old roomState
const convertQuestions = require('./convertQuestions');
const convertQuestionsToAnswers = require('./convertQuestionsToAnswers');
const createRoom = (host, questions, roomState) => {
    const { v4: uuidv4 } = require('uuid');
    const newRoom = {
        roomId: uuidv4().split('-')[0],
        host,
        players: [host],
        roomStatus: 'preLoad',
        timer: null,
        questions: convertQuestions(questions),
        answers: convertQuestionsToAnswers(questions),
        currentQuestion: null,
        previousAnswer: null,
    };
    const newRooms = roomState;
    newRooms.push(newRoom);
    return { newRoomState: newRooms, room: newRoom };
};
module.exports = createRoom;
