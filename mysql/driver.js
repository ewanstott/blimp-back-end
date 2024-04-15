const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blimp-database",
});

connection.connect();

function asyncMySQL(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });
}

module.exports = asyncMySQL;

// connection.query(`SELECT * FROM simpsons;`, function (error, results, fields) {
//   console.log(results, error);
// });

// simpsons.forEach((item) => {
//   connection.query(
//     `SELECT * FROM simpsons;`,
//     function (error, results, fields) {
//       console.log(results, error);
//     }
//   );
// });
