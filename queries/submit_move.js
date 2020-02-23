const Game = require('../models/Game');
const {WordFrequency} = require('../models/WordFrequency');
const {getPlayerLetters, isValidWord} = require('../game_logic/turn_management');
const {getNewWordsFromBoard} = require('../game_logic/board_parsing');

const getNewWords = currentGame => {
    const {board} = currentGame;
    // get previously played words
    const oldWords = currentGame.words.length > 0 ? currentGame.words.map(({word}) => word) : [];
    // find newly placed words
    return getNewWordsFromBoard(oldWords, board)
}

const updateLetterPoolAndHand = (currentGame, playerId) => {
    const {letterPool} = currentGame;

    const indexOfHand = currentGame.hands.findIndex(hand => hand.playerId == playerId)

    const {letters} = currentGame.hands[indexOfHand]

    return getPlayerLetters(letters, letterPool)
}

const categorizeNewWords = async (newWords, playerId) => {
    const playerWords = await findWordScores(newWords, playerId)
    const validWords = [];
    const fakeAssWords = [];    

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
    return {playerWords, validWords, fakeAssWords}
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

const getGameFromPreviousState = async _id =>
    await Game.findOne({_id})

const submitMove = async (game, playerId) => {
    const newWords = getNewWords(game)

    const {playerWords, validWords, fakeAssWords} = await categorizeNewWords(newWords, playerId)
// TODO ADD validWords to playerWords with full score!
    if (fakeAssWords.length > 0) {
        const updatedGame = await getGameFromPreviousState(game._id)
        return {
            updatedGame, 
            newWords: playerWords, 
            fakeAssWords, 
            validUnsavedWords: validWords
        }
    } else {
        const {newLetterPool, newHand} = updateLetterPoolAndHand(game, playerId)
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
}

module.exports = submitMove
