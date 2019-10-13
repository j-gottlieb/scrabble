const {LETTER_QUANTITIES, STARTING_LETTERS_QUANTITY} = require('./constants');
const {getRandomIndex} = require('./utility');

const getStartingLetters = () => {
  const letters = []
  for (let letter in LETTER_QUANTITIES) {
    for (let i = 0; i < LETTER_QUANTITIES[letter]; i++) {
      letters.push(letter)
    }
  }
  return letters
}



module.exports = {
  STARTING_LETTERS: getStartingLetters()
}
