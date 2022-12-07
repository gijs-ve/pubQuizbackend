const isAnswerCorrect = (currentQuestion, playerAnswer, answers) => {
    const { answer } = answers.find((i) => i.id === currentQuestion.id);
    if (playerAnswer !== answer) return false;
    return true;
};
module.exports = isAnswerCorrect;
