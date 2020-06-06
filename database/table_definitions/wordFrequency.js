const createTableStatement = '\
CREATE TABLE IF NOT EXISTS wordFrequency (\
  Word VARCHAR(100) NOT NULL, \
  Frequency BIGINT NOT NULL, \
  FrequencyPercentile FLOAT, \
  PRIMARY KEY (word)\
);\
'

const insertStatement = "\
INSERT IGNORE INTO flexicon.wordFrequency \
VALUES ('hello', 10, 20.9);\
" 

module.exports = {
  createTableStatement,
  insertStatement
}
