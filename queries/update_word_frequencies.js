const {WordFrequency} = require('../models/WordFrequency')
const rp = require('request-promise');
const cheerio = require('cheerio');
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

const maxAttempts = 1
let attemptCount = 0

const recursiveCrawl = () =>
  new Promise(async (res, rej) => {
    res(crawl())
  })

const crawl = async (url = wikipediaUrl) => {
  let wordFrequencies = {}
  try {
      console.log(attemptCount)
      const html = await rp(url)
      wordFrequencies = countWords(wordFrequencies, html)
      if (attemptCount < maxAttempts) {
        const url = getRandomUrl(html)
        attemptCount++
        crawl(url)
      } else {
        console.log(wordFrequencies)
        return wordFrequencies
      }
  } catch(e) {
    if (attemptCount < maxAttempts) {
      crawl()
    }
  }
}









const updateWordFrequencies = async () => {
  recursiveCrawl()
    .then(frequencies => console.log(frequencies))
  // incrementWordFrequencies(newFrequencies)
  // updatePercentiles()
}

const incrementWordFrequencies = newFrequencies => {
  console.log('herefirst')
  newFrequencies.forEach((word, count) => {
    console.log('here')
    WordFrequency.findOneAndUpdate({word}, {$inc : {count}}).exec()
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
