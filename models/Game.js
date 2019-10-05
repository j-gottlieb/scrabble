const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  board: [{
    letter: String,
    isValidPosition: Boolean
  }],
  letterPool: [{
    type: String
  }]
});

module.exports = Game = mongoose.model('game', GameSchema);
