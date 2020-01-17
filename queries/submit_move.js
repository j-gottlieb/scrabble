const Game = require('../models/Game');
const {WordFrequency} = require('../models/WordFrequency');
const {getPlayerLetters, isValidWord} = require('../game_logic/turn_management');
const {getNewWords} = require('../game_logic/board_parsing');

const getNewLettersAndWords = (currentGame, playerId) => {
    const {board, letterPool} = currentGame;
    // get previously played words
    const oldWords = currentGame.words.length > 0 ? currentGame.words.map(({word}) => word) : [];
    // find newly placed words
    const newWords = getNewWords(oldWords, board, playerId)

    const indexOfHand = currentGame.hands.findIndex(hand => hand.playerId == playerId)

    const {letters} = currentGame.hands[indexOfHand]

    const {newHand, newLetterPool} = getPlayerLetters(letters, letterPool)

    return {newLetterPool, newWords, newHand}
}

const findWordScores = async (newWords, playerId) => {
    const wordFrequencies = await WordFrequency.find({word: {$in: newWords}}).exec();
    return wordFrequencies.map(({word, score}) => ({word, score, playerId}))
}

const updateGame = async (_id, board, newLetterPool, playerWords, newHand, playerId) => {
    const updatedGame = await Game.findOneAndUpdate(
        {_id, "hands.playerId": playerId},
        {
          board,
          letterPool: newLetterPool,
          $inc: {turnNumber: 1},
          $set: {
            "hands.$.letters": newHand
          },
          $push: {words: {$each: playerWords}},
        },
        {new: true, useFindAndModify: false}).exec();
    return updatedGame
}

const submitMove = async (game, playerId) => {
    const {newLetterPool, newWords, newHand} = getNewLettersAndWords(game, playerId)
    const playerWords = await findWordScores(newWords, playerId)
    const validWords = [];
    const fakeAssWords = [];
    // if words did not exist in the db, handle the unknown words
    if (playerWords.length !== newWords.length) {
        const wordsNotInDB = newWords.filter(newWord => !playerWords.some(({word}) => word === newWord))
        // find words that pass the spell check
        for (let i = 0; i < wordsNotInDB.length; i++) {
            const currentWord = wordsNotInDB[i]
            if (isValidWord(currentWord)) {
                validWords.push(currentWord)
            } else {
                fakeAssWords.push(currentWord)
            }
        }
    }

    const updatedGame = await updateGame(
        game._id, 
        game.board, 
        newLetterPool, 
        playerWords, 
        newHand, 
        playerId
    )
    return {
        updatedGame, 
        newWords: playerWords, 
        fakeAssWords, 
        validUnsavedWords: validWords
    }
}

module.exports = submitMove
