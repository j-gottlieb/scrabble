USE flexicon_words;
CREATE TABLE word_frequency(
   word_id INT NOT NULL AUTO_INCREMENT,
   word VARCHAR(50) NOT NULL,
   word_usage_frequency INT NOT NULL,
   submission_date DATETIME,
   PRIMARY KEY ( word_id )
);
