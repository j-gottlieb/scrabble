const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordFrequency = mongoose.model('WordFrequency', new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  word: {
    type: String,
    required: true,
    unique: true
  },
  frequency: Number,
  count: Number,
  rank: Number,
  percentile: Number,
  score: Number
}));

const WordFrequencyBackup = mongoose.model('WordFrequencyBackup', new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  word: {
    type: String,
    required: true,
    unique: true
  },
  frequency: Number,
  count: Number,
  rank: Number,
  percentile: Number,
  score: Number
}));

module.exports = {
  WordFrequency,
  WordFrequencyBackup
}
