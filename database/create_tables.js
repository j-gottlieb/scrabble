const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jisaac16"
});

const sql = 'SELECT * FROM flexicon.wordFrequency'

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result[0]);
    });
  });