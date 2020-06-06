const {runQueryBatch} = require('./query_functions');
const {isProduction} = require('../env_helpers');

/**
 * Table definitions are defined in /database/table_definitions.
 * Each file in that dir should have a `createTableStatement` and an `insertStatement` that are exported.
 *
 * module.exports = {
 *  createTableStatement,
 *  insertStatement
 * }
 */
const getTableDefinitions = () => {
  const normalizedPath = require('path').join(__dirname, 'table_definitions');

  const tableDefinitions = {
    createTableStatements: [],
    insertStatements: []
  };

  require('fs').readdirSync(normalizedPath).map(file => {
    const {createTableStatement, insertStatement} = require('./table_definitions/' + file);
    tableDefinitions.createTableStatements.push(createTableStatement);
    if (insertStatement) tableDefinitions.insertStatements.push(insertStatement);
  });

  return tableDefinitions
}

const createAndLoadTables = async () => {
  try {
    const {createTableStatements, insertStatements} = getTableDefinitions();
    runQueryBatch(createTableStatements);
    if (!isProduction()) {
      runQueryBatch(insertStatements);
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = createAndLoadTables;
