const createGame = (createInfo, rooms) => {
 const {hostName, categories, playerCount} = createInfo
 let {questionCount} = createInfo
 if (questionCount >=20) {
    questionCount = 20
 }
 if (isNaN(questionCount) || questionCount <= 5)
    questionCount = 5

    axios.get("")


}
module.exports = createGame