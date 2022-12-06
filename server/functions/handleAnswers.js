//function that handles the end of a question round, when the timer runs out
const handleAnswers = (room) => {
    const newPlayers = room.players.map((i) => {
        if (
            isAnswerCorrect(room.currentQuestion, i.currentAnswer, room.answers)
        ) {
            return { ...i, score: i.score + 1 };
        }
        return i;
    });
    return newPlayers;
};
module.exports = handleAnswers;
