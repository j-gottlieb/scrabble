const {getRandomIndex} = require('./utility');
const {STARTING_LETTERS_QUANTITY} = require('./constants')
const Typo = require('typo-js');
const dictionary = new Typo('en_US');

const isValidTurn = board => {
  const newLetters = board.reduce((newLetters, {isValidPosition, letter}, index) => {
    if (isValidPosition && letter !== '') {
      newLetters.push(index)
    }
    return newLetters
  }, []);
  if (newLetters.length === 0) return true;
  const oldLetters = board.reduce((oldLetters, {isValidPosition}, index) => {
    if (!isValidPosition) {
      oldLetters.push(index)
    }
    return oldLetters
  }, []);

  newLetters.sort((a, b) => a - b)
  // check that newLetters are in a straight line
  let isHorizontal = false;
  let isVertical = false;
  for (let i = 1; i < newLetters.length; i++) {
    if (isVertical) {
      if (newLetters[i] - newLetters[i - 1] === 1) {
        return false
      }
    }
    if (isHorizontal) {
      if (newLetters[i] - newLetters[i - 1] === 15) {
        return false
      }
    }
    if (newLetters[i] - newLetters[i - 1] === 1) {
      isHorizontal = true
    } else if (newLetters[i] - newLetters[i - 1] === 15) {
      isVertical = true
    } else {
      return false
    }
  }

  if (oldLetters.length === 0) return true;

  // check that at least one letter is adjacent
  for (let i = 0; i < newLetters.length; i++) {
    const isTopSide = newLetters[i] < 15;
    const isBottomSide = 225 - newLetters[i] < 15;
    const isLeftSide = newLetters[i] % 15 === 0;
    const isRightSide = newLetters[i] % 14 === 0;

    const left = oldLetters.includes(newLetters[i] - 1);
    const right = oldLetters.includes(newLetters[i] + 1);
    const up = oldLetters.includes(newLetters[i] - 15);
    const down = oldLetters.includes(newLetters[i] + 15);

    if (isTopSide) {
      if (isLeftSide) {
        if (right || down) {
          return true;
        }
      } else if (isRightSide) {
        if (left || down) {
          return true;
        }
      } else {
        if (left || right || down) {
          return true;
        }
      }
    } else if (isBottomSide) {
      if (isLeftSide) {
        if (right || up) {
          return true;
        }
      } else if (isRightSide) {
        if (left || up) {
          return true;
        }
      } else {
        if (left || right || up) {
          return true;
        }
      }
    } else if (isLeftSide) {
      if (right || up || down) {
        return true;
      }
    } else if (isRightSide) {
      if (left || up || down) {
        return true;
      }
    } else {
      if (left || right || up || down) {
        return true;
      }
    }
  }

  return false;
}

const getPlayerLetters = (playerLetters, letterPool) => {
  const numberOfLettersToDraw =
    STARTING_LETTERS_QUANTITY - playerLetters.length
  const lettersToAddToHand = []

  while (lettersToAddToHand.length < numberOfLettersToDraw) {
    const poolLength = letterPool.length;
    if (poolLength === 0) break;

    const randomLetterIndex = getRandomIndex(poolLength)
    lettersToAddToHand.push(...letterPool.splice(randomLetterIndex, 1))
  }
  
  return {
    newLetterPool: letterPool,
    newHand: [...playerLetters, ...lettersToAddToHand]
  }
}

const isValidWord = word => dictionary.check(word);

module.exports = {
  isValidTurn,
  getPlayerLetters,
  isValidWord
}
