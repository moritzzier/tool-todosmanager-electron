const { controller, initialize } = require("./controller");
const { getTodos } = require("./controllers/todoController");
const { getMitarbeiter } = require("./controllers/mitarbeiterController");

initialize().then(() => {
  renderTodos();
  renderMitarbeiter();
});

async function renderTodos() {
  const todos = await getTodos();
  console.log("todos", todos);
}

async function renderMitarbeiter() {
  const mitarbeiter = await getMitarbeiter();
  console.log("mitarbeiter", mitarbeiter);
}
