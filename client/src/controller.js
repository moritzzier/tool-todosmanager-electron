const mysql = require("mysql");
const fs = require("fs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true,
});

function initialize() {
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
        }
      );
    }
  );
}

exports.connection = connection;
exports.initialize = initialize;
