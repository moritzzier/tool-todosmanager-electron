const { controller, initialize } = require("./controller");
const { getTodos } = require("./controllers/todoController");

initialize().then(() => {
  renderTodos();
});

async function renderTodos() {
  const result = await getTodos();

  console.log(result);
}
