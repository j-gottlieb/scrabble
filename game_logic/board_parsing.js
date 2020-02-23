const getNewWordsFromBoard = (oldWords, board) =>
  getAllWords(board)
    .filter(word => !oldWords.includes(word))

const getAllWords = board =>
  [...getHorizontalWords(board), ...getVerticalWords(board)];

const getHorizontalWords = board => {
  const allWords = [];
  let currentWord = []

  for (let i = 0; i < board.length; i++) {
    const currentLetter = board[i].letter
    if (currentLetter !== '') {
      currentWord.push(currentLetter)
      if (i % 15 === 14) {
        if (currentWord.length > 1) {
          allWords.push(currentWord.join(''))
          currentWord = []
        }
      }
    } else {
      if (currentWord.length > 1) {
        allWords.push(currentWord.join(''))
      }
      currentWord = []
    }
  }
  return allWords
}

const getVerticalWords = board => {

  const allWords = [];
  let currentWord = []

  for (let j = 0; j < 15; j++) {
    for (let i = j; i < board.length; i += 15) {
      const currentLetter = board[i].letter
      if (currentLetter !== '') {
        currentWord.push(currentLetter)
        if ((224 - i) < 15) {
          if (currentWord.length > 1) {
            allWords.push(currentWord.join(''))
            currentWord = []
          }
        }
      } else {
        if (currentWord.length > 1) {
          allWords.push(currentWord.join(''))
        }
        currentWord = []
      }
    }
  }
  return allWords
}

const getIndexesOfNewLetters = board => {
  
}


const getEmptyBoard = () =>
  Array(225).fill({
    letter: '',
    isValidPosition: true
  })

module.exports = {
  getEmptyBoard,
getNewWordsFromBoard
}
