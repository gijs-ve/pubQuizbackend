//lowers the timer for active rooms, handles roomStatus
//emits new roomStatus if necessary
const extractQuestion = require('./extractQuestion');
const sendRoomStateToRoom = require('./sendRoomStateToRoom');
const handleAnswers = require('./handleAnswers');
const getAnswerFromQuestion = require('./getAnswerFromQuestion');

const countDown = (roomState, io) => {
    return roomState.map((i) => {
        if (i.roomStatus === 'question') {
            if (i.timer > 0) {
                const newRoom = { ...i, timer: i.timer - 1 };
                sendRoomStateToRoom(newRoom, io);
                return newRoom;
            }
            if (i.timer <= 0 && i.questions.length !== 0) {
                console.log('ROOM', i);
                const newRoom = {
                    ...i,
                    players: handleAnswers(i),
                    roomStatus: 'score',
                    previousAnswer: getAnswerFromQuestion(
                        i.answers,
                        i.currentQuestion,
                    ),
                    timer: 5,
                };
                sendRoomStateToRoom(newRoom, io);
                return newRoom;
            }
            if (i.timer <= 0 && i.questions.length === 0) {
                const newRoom = {
                    ...i,
                    players: handleAnswers(i),
                    roomStatus: 'endGame',
                    previousAnswer: getAnswerFromQuestion(
                        i.answers,
                        i.currentQuestion,
                    ),
                    timer: null,
                };
                sendRoomStateToRoom(newRoom, io);
                return newRoom;
            }
        }
        if (i.roomStatus === 'score') {
            if (i.timer > 0) {
                const newRoom = { ...i, timer: i.timer - 1 };
                sendRoomStateToRoom(newRoom, io);
                return newRoom;
            }
            if (i.timer <= 0 && i.questions.length !== 0) {
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
        }
        return i;
    });
};
module.exports = countDown;
