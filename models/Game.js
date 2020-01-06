const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  board: [{
    letter: String,
    isValidPosition: Boolean
  }],
  hands: [{
    letters: [{
      type: String
    }],
    playerId: mongoose.Schema.Types.ObjectId
  }],
  letterPool: [{
    type: String
  }],
  words: [{
    word: String,
    score: Number,
    playerId: mongoose.Schema.Types.ObjectId
  }],
  players: [{
    playerId: mongoose.Schema.Types.ObjectId,
    isOwner: Boolean
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  turnNumber: {
    type: Number,
    default: 0
  },
  name: {
    type: String
  }
});

module.exports = Game = mongoose.model('game', GameSchema);
