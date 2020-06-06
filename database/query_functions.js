const mysql = require('mysql');
const {getEnvVar} = require('../env_helpers');

const makeDb = () => {
  const config = {
    host: getEnvVar('DB_HOST'),
    user: getEnvVar('DB_USER'),
    password: getEnvVar('DB_PASSWORD'),
    database: getEnvVar('DEFAULT_DATABASE')
  }
  return mysql.createConnection(config);
}

const executeStatement = async (sqlString, callback) => {
  try {
    const db = makeDb();
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
