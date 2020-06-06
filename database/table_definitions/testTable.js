const createTableStatement = '\
CREATE TABLE IF NOT EXISTS testTable (\
  Word VARCHAR(100) NOT NULL\
); '
const insertStatement = "\
INSERT INTO testTable \
VALUES\
  ('Yeet')\
";

module.exports = {
  createTableStatement,
  insertStatement
}
