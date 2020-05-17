const {WordFrequency} = require('../models/WordFrequency')
const {isValidWord} = require('../game_logic/utility');

const deleteInvalidWords = async () => {
    await WordFrequency.find({}, (err, words) => {
        let totalWords = 0
        let deletedWords = 0
        words.forEach(entry => {
            if (!isValidWord(entry.word)) {
                console.log(entry.word)
                deletedWords++
            } else {
                // console.log(entry.word)
            }
            totalWords++
        })
        console.log(`deleted - ${deletedWords} | total - ${totalWords}`)
    })
}

module.exports = {
    deleteInvalidWords
}