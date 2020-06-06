const controller = require("../controller");

async function getTodos() {
  console.log("fetching todos");
  const todos = await controller.query(`SELECT * FROM todos AS t`);
  const result = await Promise.all(
    todos.map(async (row) => {
      return {
        ...row,
        mitarbeiter: await controller.query(
          "SELECT * FROM todos_mitarbeiter AS tm JOIN mitarbeiter AS m ON tm.mitarbeiter_id = m.id WHERE tm.todos_id = ?",
          [row.id]
        ),
      };
    })
  );
  return result;
}

async function removeTodo(id) {
  await controller.query(
    `DELETE FROM todos_mitarbeiter WHERE todos_mitarbeiter.todos_id = ?;
  DELETE FROM todos WHERE id = ?;`,
    [id, id]
  );
  return;
}

async function addTodo(name) {
  await controller.query(`INSERT INTO todos (beschreibung) VALUES (?)`, [name]);
  return;
}

async function addTodoUser(todoid, userid) {
  await controller.query(
    `INSERT INTO todos_mitarbeiter (todos_id, mitarbeiter_id) VALUES (?, ?)`,
    [todoid, userid]
  );
  return;
}

async function removeTodoUser(todoid, userid) {
  await controller.query(
    `DELETE FROM todos_mitarbeiter WHERE ? = todos_id AND mitarbeiter_id = ?`,
    [todoid, userid]
  );
  return;
}

exports.controllerGetTodos = getTodos;
exports.controllerRemoveTodo = removeTodo;
exports.controllerAddTodo = addTodo;
exports.controllerAddTodoUser = addTodoUser;
exports.controllerRemoveTodoUser = removeTodoUser;
