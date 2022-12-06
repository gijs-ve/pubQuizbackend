const extractQuestion = require('./extractQuestion');
const sendRoomStateToRoom = require('./sendRoomStateToRoom');
const onStartGame = (roomId, roomState, io) => {
    return roomState.map((i) => {
        if (i.id === roomId) {
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
    });
};
module.exports = onStartGame;
