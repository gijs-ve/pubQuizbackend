const getAnswerFromQuestion = (answers, question) => {
    return answers.find((i) => i.id === question.id);
};

module.exports = getAnswerFromQuestion;
