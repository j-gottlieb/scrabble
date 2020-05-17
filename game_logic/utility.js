const Typo = require("typo-js");
const dictionary = new Typo('en_US');
const getRandomIndex = length =>
  Math.floor(Math.random() * length);

const isValidWord = word => {
  const lowerCaseLetterRegex = /^[a-z]+$/;

  return dictionary.check(word)
  // && words.check(word)
}

module.exports = {
  getRandomIndex,
  isValidWord
}
