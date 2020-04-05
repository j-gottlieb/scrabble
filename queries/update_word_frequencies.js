const {WordFrequency} = require('../models/WordFrequency')
const rp = require('request-promise');
const cheerio = require('cheerio');
var async = require('async');
const ObjectsToCsv = require('objects-to-csv');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const wikipediaUrl = 'https://en.wikipedia.org/wiki/Special:Random'
const flexiconUrl = 'localhost5000/word_frequencies' || 'https://flexicon-game.herokuapp.com/word_frequencies'

const isValidWord = word => {
  const lowerCaseLetterRegex = /^[a-z]+$/;

  return lowerCaseLetterRegex.test(word)
  // && dictionary.check(word)
}

const getWords = (html) => {
  const $ = cheerio.load(html)
  const pTags = $('p').text()
  return pTags.split(' ')
}

const countWords = (wordFrequencies, html) => {
  const words = getWords(html)
  const newWordFrequencies = {...wordFrequencies}
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (isValidWord(word)) {
      if (newWordFrequencies[word]) {
        newWordFrequencies[word]++
      } else {
        newWordFrequencies[word] = 1
      }
    }
  }
  return newWordFrequencies
}

const getRandomUrl = (html) => {
  const urls = []
  const $ = cheerio.load(html)
  $('a').each((index, value) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    const href = $(value).attr('href')
    const isValid = !!pattern.test(href);
    if (isValid) {
      urls.push(href)
    }
  })
  return urls[Math.floor(Math.random() * urls.length)] || wikipediaUrl
}

const maxAttempts = 100
let attemptCount = 0

const recursiveCrawl = async () => {
  let wordFrequencies = {}
  let url = wikipediaUrl
  while (attemptCount < maxAttempts) {
    const result = await crawl(wordFrequencies, url)
    wordFrequencies = result.wordFrequencies
    url = result.url
    attemptCount++
  }
  return wordFrequencies
}

const crawl = async (wordFrequencies, url) => {
  try {
      const html = await rp(url)
      const newWordFrequencies = countWords(wordFrequencies, html)
      const newUrl = getRandomUrl(html)
      return {wordFrequencies: newWordFrequencies, url: newUrl}
  } catch(e) {
      return {wordFrequencies, url}
  }
}








const updateWordFrequencies = async () => {
  const frequencies = await recursiveCrawl()
  console.log(frequencies)
  const numberOfNewWords = await incrementWordFrequencies(frequencies)
  // console.log(numberOfNewWords.length)
  // updatePercentiles()
}



const incrementWordFrequencies = async newFrequencies => {
  await WordFrequency.find({word:{$in: Object.keys(newFrequencies)}}, (err, words) => {
    // if word doesn't exist save it!
    words.forEach(entry => {
      const {word} = entry;
      const count = newFrequencies[word];
      entry.frequency += count
      entry.save()
    })
  })
}

const updatePercentiles = async () => {
  const allFrequencies = await WordFrequency.find({}).exec()
  console.log(allFrequencies)
  const newPercentiles = setRanksAndPercentiles(allFrequencies)
  newPercentiles.forEach(({word, percentile, score}) => {
    WordFrequency.findOneAndUpdate({word}, {percentile, score})
  })
}

const setRanksAndPercentiles = frequencies => {
  const sortedWordArray = frequencies.sort((a, b) => b.frequency - a.frequency)
  const distinctFrequencies = {}
  wordArray.forEach(({count}) => {
    if (!distinctFrequencies[count]) {
      distinctFrequencies[count] = 1
    }
  })
  const wordsWithRank = sortedWordArray.map(word => {
    const rank = Object.keys(distinctFrequencies).filter(count => count > word.count).length
    return {...word, rank}
  })

  const highestRank = Math.max(...wordsWithRank.map(({rank}) => rank))

  return wordsWithRank
    .map(word => {
      const percentile = Math.round(100 / highestRank * word.rank)
      return {...word, percentile, score: percentile * 3}
  })
}

module.exports = {updateWordFrequencies}
