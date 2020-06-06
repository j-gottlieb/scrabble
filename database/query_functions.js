const mysql = require('mysql');

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "jisaac16",
  database: "flexicon"
};

const makeDb = config => {
  return mysql.createConnection(config);
}

const executeStatement = async (sqlString, callback) => {
  try {
    const db = makeDb(dbConfig);
    db.query(sqlString, err => {
      callback(err)
    })
  } catch (err) {
    console.log(err);
    callback(err)
  }
}

const executeSelect = async (sqlString, callback) => {
  try {
    const db = makeDb(dbConfig);
    db.query(sqlString, (err, rows) => {
      callback(err, rows)
    })
  } catch (err) {
    console.log(err)
    callback(err)
  }
}

const runQueryBatch = async queryBatch => {
  const promises = [];
  for (const sql of queryBatch) {
    promises.push(new Promise((res, rej) => {
      executeStatement(sql, err => {
        if (err) {
          console.log(err);
          rej(err)
        }
        console.log('Successfully ran sql: ' + sql);
        res(true)
      })
    }))
  }
  return await Promise.all(promises);
}

module.exports = {
  executeSelect,
  executeStatement,
  runQueryBatch
}
