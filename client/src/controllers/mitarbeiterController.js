const controller = require("../controller");

async function getMitarbeiter() {
  return await controller.query("SELECT * FROM mitarbeiter");
}

async function addUser(vorname, nachname) {
  await controller.query(
    `INSERT INTO mitarbeiter (vorname, nachname) VALUES (?, ?)`,
    [vorname, nachname]
  );
  return;
}

async function removeUser(id) {
  await controller.query("CALL `mitarbeiter_entfernen`(?)", [id]);
  return;
}

exports.controllerGetMitarbeiter = getMitarbeiter;
exports.controllerAddUser = addUser;
exports.controllerRemoveUser = removeUser;
