const mongoose = require('mongoose');
const {getNewGame} = require('../game_logic/game_management');
const {getPlayerLetters} = require('../game_logic/turn_management');
const Game = require('../models/Game');
const User = require('../models/User');

const saveNewGame = async (playerId, name) => {
  const {board, letterPool} = getNewGame();
  const {newHand, newLetterPool} = getPlayerLetters([], letterPool)
  const player = await User.find({_id: playerId}, '_id username').exec();

  const newGame = new Game({
    _id: new mongoose.Types.ObjectId,
    board,
    hands: [{
      letters: newHand,
      playerId
    }],
    letterPool: newLetterPool,
    words: [],
    players: [{
      playerId, 
      isOwner: true,
      username: player[0].username
    }],
    name
  });
    newGame.save();
    return {game: newGame, players: player}
}

module.exports = saveNewGame