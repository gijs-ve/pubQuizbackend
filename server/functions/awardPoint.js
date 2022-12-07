const awardPoint = (player) => {
    return { ...player, score: player.score + 1 };
};
module.exports = awardPoint;
