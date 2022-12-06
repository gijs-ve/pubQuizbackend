const extractQuestion = require('./extractQuestion');
const sendRoomStateToRoom = require('./sendRoomStateToRoom');
const onStartGame = (roomId, roomState, io) => {
    return roomState.map((i) => {
        if (i.roomId === roomId) {
            const { question, newQuestions } = extractQuestion(i.questions);
            const newRoom = {
                ...i,
                currentQuestion: question,
                questions: newQuestions,
                roomStatus: 'question',
                timer: 25,
            };
            sendRoomStateToRoom(newRoom, io);
            return newRoom;
        }
        return i;
    });
};
module.exports = onStartGame;
