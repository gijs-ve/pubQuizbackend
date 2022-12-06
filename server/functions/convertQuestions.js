const convertQuestions = (questions) => {
    const newQuestions = questions.map((i) => {
        const choices = [...i.incorrectAnswers, i.correctAnswer].sort(
            (a, b) => {
                const nameA = a.toUpperCase();
                const nameB = b.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            },
        );
        return {
            category: i.category,
            question: i.question,
            choices,
            id: i.id,
            tags: i.tags,
        };
    });
    return newQuestions;
};
module.exports = convertQuestions;
