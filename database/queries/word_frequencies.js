const {executeStatement, executeSelect} = require('../query_functions');

/**
 * Upsert word frequencies. Will create new row for new words and
 * add to frequency value for existing words
 * 
 * @param {array} newFrequencies
 * [{Word: 'hello', Frequency: 325}]
 */
const incrementWordFrequencies = async newFrequencies => {
    const sql = `\
INSERT INTO flexicon.wordFrequency (Word, Frequency) VALUES ? \
ON DUPLICATE KEY UPDATE \
Frequency = Frequency + VALUES(Frequency);\
`;
    await executeStatement(sql, newFrequencies)
        .then(result => {
            console.log(result.affectedRows);
        })
        .catch(err => console.log(err))
}

const getAllFrequencies = async () => {
    const sql = `\
SELECT Word, Frequency, FrequencyPercentile FROM flexicon.wordFrequency
ORDER BY Frequency DESC;
`;

    const results = await executeSelect(sql, (err, rows) => {
        if (err) console.log(err)
    })
    return results.map(({Word, Frequency, FrequencyPercentile}) => ({word: Word, frequency: Frequency, percentile: FrequencyPercentile}))
}

const createTempTable = async () => {
    const tempTableSql = `\
CREATE TABLE IF NOT EXISTS percentileData (\
Word VARCHAR(100) NOT NULL, \
Frequency BIGINT NOT NULL, \
FrequencyPercentile FLOAT, \
PRIMARY KEY (word)\
);\
`;

    return executeStatement(tempTableSql)
        .then(result => ({result, name: 'create'}))
}

const insertIntoTempTable = async (wordData) => {
    const tempTableInsertSql = `\
INSERT INTO percentileData (Word, Frequency, FrequencyPercentile) \
VALUES ?;
    `;
    
    return executeStatement(tempTableInsertSql, wordData)
        .then(result => ({result, name: 'insert'}))
}

const updatePercentiles = async () => {
    const updateSql = `\
UPDATE wordFrequency AS old \
INNER JOIN percentileData AS new ON old.Word = new.Word \
SET old.FrequencyPercentile = new.FrequencyPercentile \
WHERE new.Word IS NOT NULL;
`;

    return executeStatement(updateSql)
        .then(result => ({result, name: 'update'}))
}

const dropTempTable = async () => {
    const dropTempTable = `DROP TABLE percentileData;`;


    return executeStatement(dropTempTable)
        .then(result => ({result, name: 'drop'}))
}

const setPercentilesFromCompleteWordData = async wordData => {
    const asyncList = [createTempTable, () => insertIntoTempTable(wordData), updatePercentiles, dropTempTable];
    const starterPromise = Promise.resolve(null);

    await asyncList.reduce(
        (promise, fn) => promise
            .then(() => fn()
            .then(result => console.log(`${result.name} affected ${result.result.affectedRows} rows`)))
            .catch(err => console.log(err)),
        starterPromise
    );
}

module.exports = {
    incrementWordFrequencies,
    getAllFrequencies,
    setPercentilesFromCompleteWordData
}