const mongoose = require('mongoose');
const {getNewGame} = require('../game_logic/game_management');
const {getPlayerLetters} = require('../game_logic/turn_management');
const Game = require('../models/Game');

const saveNewGame = async playerId =>
  new Promise((res, rej) => {
  try {
    const {board, letterPool} = getNewGame();
    const {newHand, newLetterPool} = getPlayerLetters([], letterPool)
    const newGame = new Game({
      _id: new mongoose.Types.ObjectId,
      board,
      hands: [{
        letters: newHand,
        playerId
      }],
      letterPool: newLetterPool,
      words: [],
      players: [{playerId, isOwner: true, isCurrentTurn: true}]
    });

      newGame.save();
      res(newGame)
    } catch (err) {
      rej(err)
    }
})

module.exports = saveNewGame