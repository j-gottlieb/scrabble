const {getEmptyBoard} = require('./board_parsing');
const {STARTING_LETTERS} = require('./letter_pool');

const getNewGame = playerId => ({
  board: getEmptyBoard(),
  letterPool: STARTING_LETTERS
})

module.exports = {getNewGame}
