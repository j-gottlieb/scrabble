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

const executeStatement = async (sqlString, values) => {
  try {
    const db = makeDb();
    return new Promise((res, rej) => {
      db.query(sqlString, [values], (err, result) => {
        if (err) rej(err)
        return res(result)
      })
    })
  } catch (err) {
    console.log(err);
    callback(err)
  }
}

const executeSelect = async (sqlString, values) => {
  try {
    const db = makeDb();
    return new Promise((res, rej) => {
      db.query(sqlString, [values], (err, results) => {
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
    promises.push(
      executeStatement(sql).then(result => console.log(result.affectedRows))
    )
  }
  return await Promise.all(promises);
}

module.exports = {
  executeSelect,
  executeStatement,
  runQueryBatch
}
