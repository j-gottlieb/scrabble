const {WordFrequency} = require('../models/WordFrequency')
const {isValidWord} = require('../queries/update_word_frequencies');

const deleteInvalidWords = () => {
    WordFrequency.find({})
        .lean()
        .exec()
        .then(words => {
            return words
                .filter(({word}) => !isValidWord(word))
                .map(({_id}) => _id)
        })
        .then(badIds => {
            WordFrequency.deleteMany({_id: {$in: badIds}}).exec()
            .then(() => console.log('deleted lots of words'))
        })
    
    // await WordFrequency.find({}, (err, words) => {
    //     let totalWords = 0
    //     let deletedWords = 0
    //     words.forEach(entry => {
    //         if (!isValidWord(entry.word)) {
    //             console.log(entry.word)
    //             deletedWords++
    //         } else {
    //             // console.log(entry.word)
    //         }
    //         totalWords++
    //     })
    //     console.log(`deleted - ${deletedWords} | total - ${totalWords}`)
    // })
}

module.exports = {
    deleteInvalidWords
}