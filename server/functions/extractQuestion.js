//Remove a question from the question array that is inside the room
//Returns the question and the new rooms
const extractQuestion = (questions) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    const newQuestions = questions.filter((i) => {
        if (i.id === question.id) return false;
        return true;
    });
    return { question, newQuestions };
};
module.exports = extractQuestion;
