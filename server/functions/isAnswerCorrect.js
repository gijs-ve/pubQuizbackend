const isAnswerCorrect = (currentQuestion, playerAnswer, answers) => {
    const { answer } = answers.find((i) => i.id === currentQuestion.id);
    console.log('Answer', answer);
    if (playerAnswer !== answer) return false;
    return true;
};
module.exports = isAnswerCorrect;
