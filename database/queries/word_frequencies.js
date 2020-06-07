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
    await executeStatement(sql, newFrequencies, (err, result) => {
        if (err) console.log(err)
        console.log(result.affectedRows);
    });
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

    return new Promise((res, rej) => {
        executeStatement(tempTableSql, null, (err, result) => {
            if (err) rej(err)
            res(result.affectedRows)
            console.log('tempTable');
        });
    })
}

const insertIntoTempTable = async (wordData) => {
    const tempTableInsertSql = `\
    INSERT INTO percentileData (Word, Frequency, FrequencyPercentile) \
        VALUES ?;
    `;
    
    return new Promise((res, rej) => {
        executeStatement(tempTableInsertSql, wordData, (err, result) => {
            if (err) console.log(err)
            res(result.affectedRows)
            console.log(result.affectedRows, 'insert');
        });
    })
}

const updatePercentiles = async () => {
    const updateSql = `\
UPDATE wordFrequency AS old \
INNER JOIN percentileData AS new ON old.Word = new.Word \
SET old.FrequencyPercentile = new.FrequencyPercentile \
WHERE new.Word IS NOT NULL;
`;

    return new Promise((res, rej) => {
        executeStatement(updateSql, null, (err, result) => {
            if (err) console.log(err)
            res(result.affectedRows)
            console.log(result.affectedRows, 'update');
        });
    });
}

const dropTempTable = async () => {
    const dropTempTable = `DROP TABLE percentileData;`;

    return new Promise((res, rej) => {
        executeStatement(dropTempTable, null, (err, result) => {
            if (err) console.log(err)
            res(result.affectedRows)
            console.log(result.affectedRows, 'drop');
        });
    })
}

const setPercentilesFromCompleteWordData = async wordData => {
    const promisified = () => (
        new Promise((res, rej) => {
            const thing =ç insertIntoTempTable(wordData)
            res(thing);
        })
    )
    const asyncList = [createTempTable, promisified, updatePercentiles, dropTempTable];
    const starterPromise = Promise.resolve(null);

    await asyncList.reduce(
        (promise, fn) => promise.then(() => fn()),
        starterPromise
    );
}

module.exports = {
    incrementWordFrequencies,
    getAllFrequencies,
    setPercentilesFromCompleteWordData
}