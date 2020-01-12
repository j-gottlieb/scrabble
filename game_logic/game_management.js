const {getEmptyBoard} = require('./board_parsing');
const {STARTING_LETTERS} = require('./letter_pool');

const getNewGame = playerId => ({
  board: getEmptyBoard(),
  letterPool: STARTING_LETTERS
})

const isGameOver = ({letterPool, hands}) =>
  letterPool.length === 0
  && hands.some(({letters}) => letters.length === 0)

module.exports = {getNewGame}
