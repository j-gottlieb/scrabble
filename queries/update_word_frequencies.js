const {WordFrequency, WordFrequencyBackup} = require('../models/WordFrequency')
const rp = require('request-promise');
const cheerio = require('cheerio');
const {
  incrementWordFrequencies,
  getAllFrequencies,
  setPercentilesFromCompleteWordData
} = require('../database/queries/word_frequencies');


// Constants
const wikipediaUrl = /**'https://nytimes.com'**/ 'https://en.wikipedia.org/wiki/Special:Random'
const flexiconUrl = 'localhost:5000/word_frequencies' || 'https://flexicon-game.herokuapp.com/word_frequencies'
const Typo = require("typo-js");
const dictionary = new Typo('en_US', false, false, {dictionaryPath: "./dictionary"});

const isValidWord = word => {
  const lowerCaseLetterRegex = /^[a-z]+$/;

  return dictionary.check(word) && lowerCaseLetterRegex.test(word)
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
  let url = urls[Math.floor(Math.random() * urls.length)] || wikipediaUrl
  while (url.includes('facebook')) {
    url = urls[Math.floor(Math.random() * urls.length)] || wikipediaUrl
  }
  return url
}

const maxAttempts = 5
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
      return {wordFrequencies, url: wikipediaUrl}
  }
}

/**
 * Format data to align with the table flexicon.WordFrequency
 * 
 * @param {Object} frequencies 
 */
const formatRawFrequenciesForUpsert = frequencies => (
  Object.keys(frequencies).map(word => ([word, frequencies[word]]))
)

const formatPercentileDataForUpdate = data => (
  data.map(({word, frequency, percentile}) => [word, frequency, percentile])
)

const updateWordFrequencies = async () => {
  // get new frequencies
  const frequencies = await recursiveCrawl()
  // Add new counts to existing counts
  await incrementWordFrequencies(formatRawFrequenciesForUpsert(frequencies));
  const allFrequencies = await getAllFrequencies();
  // console.log(allFrequencies)
  // Recalculate percentiles and rankings
  const frequenciesWithPercentile = await setRanksAndPercentiles(allFrequencies)
  setPercentilesFromCompleteWordData(formatPercentileDataForUpdate(frequenciesWithPercentile));
}

// const incrementWordFrequencies = async newFrequencies => {
//   console.log()
//   const map = {}
//   const idsToDelete = []
//   await WordFrequency.find({word:{$in: Object.keys(newFrequencies)}})
//     .exec()
//     .then((words) => {
//       words.forEach((entry, index) => {
//         const {word, _id} = entry;
//         const count = newFrequencies[word];
//         if (!map[word]) {
//           map[word] = entry.frequency
//         } else if (map[word] > entry.frequency) {
//           entry.frequency = map[word]
//         }
//         idsToDelete.push(entry._id)
//       })
//     })

//   await WordFrequency.deleteMany({_id: {$in: idsToDelete}}).exec()

//   const formattedFrequencies = Object.keys(map).map(word => {
//     return {word, frequency: map[word]}
//   })

//   await WordFrequency.insertMany(formattedFrequencies)
// }

// const updatePercentiles = async () => {
//   const words = await WordFrequency.find({}).lean()
//   const newPercentiles = setRanksAndPercentiles(words)
//   const noIds = newPercentiles.map(({word, frequency, rank, percentile}) => ({word, frequency, rank, percentile}))
//   if (noIds.length > 0) {
//     try {
//       await WordFrequency.deleteMany({})
//       console.log('deleted main db')
//       await WordFrequency.insertMany(noIds, [{ordered: false}])
//               .then((result) => console.log(`inserted ${typeof result} words!`))
//       await WordFrequencyBackup.deleteMany({})
//       console.log('deleted backup')
//       await WordFrequencyBackup.insertMany(newPercentiles, [{ordered: false}])
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

const setRanksAndPercentiles = frequencies => {
  const sortedWordArray = frequencies.sort((a, b) => b.frequency - a.frequency)
  const distinctFrequencies = {}
  sortedWordArray.forEach(({frequency}) => {
    if (!distinctFrequencies[frequency]) {
      distinctFrequencies[frequency] = 1
    }
  })
  const wordsWithRank = sortedWordArray.map(word => {
    const rank = Object.keys(distinctFrequencies).filter(frequency => frequency > word.frequency).length
    return {...word, rank}
  })

  const highestRank = Math.max(...wordsWithRank.map(({rank}) => rank))
  return wordsWithRank
    .map(word => {
      const percentile = Math.round(100 / highestRank * word.rank)
      return {...word, percentile, score: percentile * 3}
  })
}

module.exports = {updateWordFrequencies, isValidWord}
