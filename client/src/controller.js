const mysql = require("mysql");
const fs = require("fs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true,
});

const initialized = false;

async function initialize() {
  connection.connect();
  console.log(__dirname + "\\init.sql");

  connection.query(
    fs.readFileSync(__dirname + "/sqls/init_tables.sql", "utf8"),
    (err, result) => {
      if (err) throw err;
      connection.query(
        fs.readFileSync(__dirname + "/sqls/init_procedure.sql", "utf8"),
        (err, result) => {
          if (err) throw err;
          console.log(result);
          initialized = true;
          return true;
        }
      );
    }
  );
}

function query(querystring, queryvalues) {
  return new Promise((resolve, reject) => {
    if (!initialized) {
      return false;
    }
    connection.query(querystring, queryvalues, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

exports.connection = connection;
exports.initialize = initialize;
exports.query = query;
