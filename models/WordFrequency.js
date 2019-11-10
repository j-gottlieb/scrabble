const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordFrequency = mongoose.model('WordFrequency', new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  word: String,
  frequency: String
}));

module.exports = {
  WordFrequency
}
