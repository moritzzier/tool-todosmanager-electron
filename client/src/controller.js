const mysql = require("mysql");
const fs = require("fs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true,
});

var initialized = false;

function initialize() {
  return new Promise((resolve, reject) => {
    connection.connect();

    console.log(__dirname + "\\init.sql");

    connection.query(
      fs.readFileSync(__dirname + "/sqls/init_tables.sql", "utf8"),
      (err, result) => {
        if (err) {
          reject(err);
        }
        connection.query(
          fs.readFileSync(__dirname + "/sqls/init_procedure.sql", "utf8"),
          (err, result) => {
            if (err) {
              reject(err);
            }
            console.log("Datenbank erfolgreich initialisiert!");
            initialized = true;
            resolve();
          }
        );
      }
    );
  });
}

function query(querystring, queryvalues) {
  return new Promise((resolve, reject) => {
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
