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
    if (initialized === false) {
      console.log("[CONTROLLER]", "Datenbank wird initialisiert");
      connection.connect((err) => {
        if (err) {
          console.error("[CONTROLLER]", err);
        }
        connection.query(
          fs.readFileSync(__dirname + "/sqls/init_tables.sql", "utf8"),
          (err, result) => {
            if (err) {
              reject(err);
            }
            console.log("[CONTROLLER]", "Tabellen wurden initialisiert");
            connection.query(
              fs.readFileSync(__dirname + "/sqls/init_procedure.sql", "utf8"),
              (err, result) => {
                if (err) {
                  reject(err);
                }
                console.log(
                  "[CONTROLLER]",
                  "StoredProcedures wurden initialisiert"
                );
                console.log(
                  "[CONTROLLER]",
                  "Datenbank erfolgreich initialisiert!"
                );
                initialized = true;
                resolve();
              }
            );
          }
        );
      });
    } else {
      resolve();
    }
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
