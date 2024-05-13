const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "blimp-database",
// });
const connection = mysql.createConnection({
  host: "blimp-health.com",
  user: "blimphea_blimp-health",
  password: "+1!1KKmPu#yp",
  database: "blimphea_blimp-health",
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
