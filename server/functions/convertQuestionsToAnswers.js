const convertQuestionsToAnswers = (questions) => {
    return questions.map((i) => {
        return { id: i.id, answer: i.correctAnswer };
    });
};
module.exports = convertQuestionsToAnswers;
