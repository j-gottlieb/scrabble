export const getPlayerScore = playerWords =>
    playerWords.reduce((sum, {score}) => sum += score, 0)
