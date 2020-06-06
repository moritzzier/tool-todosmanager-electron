const controller = require("../controller");

async function getTodos() {
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

  console.log(result);
  return result;
}

exports.getTodos = getTodos;
