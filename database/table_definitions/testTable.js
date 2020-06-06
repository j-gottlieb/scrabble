const createTableStatement = '\
CREATE TABLE IF NOT EXISTS testTable (\
  Word VARCHAR(100) NOT NULL\
); '
const insertStatement = "\
INSERT IGNORE INTO testTable \
VALUES\
  ('Yeet')\
";

module.exports = {
  createTableStatement,
  insertStatement
}
