const extractQuestion = require('./extractQuestion');
const sendRoomStateToRoom = require('./sendRoomStateToRoom');
//returns the roomState with a new roomStatus and the setup for the first questions
//also sends this new room, with the first question, to the clients in the room
const onStartGame = (roomId, roomState, io) => {
    return roomState.map((i) => {
        if (i.roomId === roomId) {
            const { question, newQuestions } = extractQuestion(i.questions);
            const newRoom = {
                ...i,
                currentQuestion: question,
                questions: newQuestions,
                roomStatus: 'question',
                timer: 10,
            };
            sendRoomStateToRoom(newRoom, io);
            return newRoom;
        }
        return i;
    });
};
module.exports = onStartGame;
