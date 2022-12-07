//function that handles the end of a question round, when the timer runs out
const isAnswerCorrect = require('./isAnswerCorrect');
const handleAnswers = (room) => {
    const newPlayers = room.players.map((i) => {
        if (
            isAnswerCorrect(room.currentQuestion, i.currentAnswer, room.answers)
        ) {
            return {
                ...i,
                score: i.score + 1,
                previousAnswer: i.currentAnswer,
                currentAnswer: null,
            };
        }
        return { ...i, previousAnswer: i.currentAnswer, currentAnswer: null };
    });
    return newPlayers;
};
module.exports = handleAnswers;
