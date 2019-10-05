const LETTER_QUANTITIES = {
  'a': 9,
  'b': 2,
  'c': 2,
  'd': 4,
  'e': 12,
  'f': 2,
  'g': 3,
  'h': 2,
  'i': 9,
  'j': 1,
  'k': 1,
  'l': 4,
  'm': 2,
  'n': 6,
  'o': 8,
  'p': 2,
  'q': 1,
  'r': 6,
  's': 4,
  't': 6,
  'u': 4,
  'v': 2,
  'w': 2,
  'x': 1,
  'y': 2,
  'z': 1
}

const STARTING_LETTERS = () => {
  const letters = []
  for (let letter in LETTER_QUANTITIES) {
    for (let i = 0; i < LETTER_QUANTITIES[letter]; i++) {
      letters.push(letter)
    }
  }
  return letters
}
const STARTING_LETTERS_QUANTITY = 7;

const getAllWords = board => {
  return [...getHorizontalWords(board, horizontalCallback), ...getVerticalWords(board, verticalCallback)];
}

const verticalCallback = (i) => 224 - i > 209
const horizontalCallback = (i) => i % 15 === 14

const getHorizontalWords = board => {
  let isContiguousWord = false;

  const allWords = [];
  let currentWord = []

  for (let i = 0; i < board.length; i++) {
    const currentLetter = board[i].letter
    if (currentLetter !== '') {
      isContiguousWord = true
      currentWord.push(currentLetter)
      if (i % 15 === 14) {
        isContiguousWord = false
        if (currentWord.length > 1) {
          allWords.push(currentWord.join(''))
          currentWord = []
        }
      }
    } else {
      isContiguousWord = false
      if (currentWord.length > 1) {
        allWords.push(currentWord.join(''))
        currentWord = []
      }
    }
  }
  return allWords
}

const getVerticalWords = board => {
  let isContiguousWord = false;

  const allWords = [];
  let currentWord = []

  for (let i = 0; i < board.length; i += 15) {
    const currentLetter = board[i].letter
    if (currentLetter !== '') {
      isContiguousWord = true
      currentWord.push(currentLetter)
      if ((224 - i) > 209) {
        isContiguousWord = false
        if (currentWord.length > 1) {
          allWords.push(currentWord.join(''))
          currentWord = []
        }
        i = (225 % i) - 15
      }
    } else {
      isContiguousWord = false
      if (currentWord.length > 1) {
        allWords.push(currentWord.join(''))
        currentWord = []
      }
    }
  }
  return allWords
}

const getPlayerLetters = (playerLetters, letterPool) => {
  const numberOfLettersToDraw =
    STARTING_LETTERS_QUANTITY - playerLetters.length
  const lettersToAddToHand = []

  while (lettersToAddToHand.length < numberOfLettersToDraw) {
    const randomLetterIndex = getRandomIndex(letterPool.length)
    lettersToAddToHand.push(...letterPool.splice(randomLetterIndex, 1))
  }
  return {
    newLetterPool: letterPool,
    newHand: [...playerLetters, ...lettersToAddToHand]
  }
}

const getRandomIndex = length =>
  Math.floor(Math.random() * length);


const getEmptyBoard = () =>
  Array(225).fill({
    letter: ''
  })

const getNewBoard = playerId => ({
  board: getEmptyBoard(),
  letterPool: STARTING_LETTERS()
})

module.exports = {
  getNewBoard,
  getPlayerLetters,
  getWordScore,
  getAllWords
}
