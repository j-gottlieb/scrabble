const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordFrequency = mongoose.model('WordFrequency', new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rank: Number,
  partOfSpeech: String,
  word: String,
  frequency: String,
  dispersion: Number
}));

module.exports = {
  WordFrequency
}
