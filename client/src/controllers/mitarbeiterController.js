const controller = require("../controller");

async function getMitarbeiter() {
  return await controller.query("SELECT * FROM mitarbeiter");
}

exports.getMitarbeiter = getMitarbeiter;
