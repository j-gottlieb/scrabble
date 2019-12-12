const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordFrequency = mongoose.model('WordFrequency', new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  word: String,
  count: Number,
  rank: Number,
  percentile: Number,
  score: Number
}));

module.exports = {
  WordFrequency
}
