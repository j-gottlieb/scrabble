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

const executeStatement = async (sqlString, values, callback) => {
  try {
    if (callback === undefined) callback = values;
    const db = makeDb();
    db.query(sqlString, [values], (err, result) => {
      callback(err, result)
    })
  } catch (err) {
    console.log(err);
    callback(err)
  }
}

const executeSelect = async (sqlString, callback) => {
  try {
    const db = makeDb();
    return new Promise((res, rej) => {
      db.query(sqlString, (err, results) => {
        if (err) rej(err);
        return res(results);
      });
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
