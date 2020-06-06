const $ = require("jquery");
const { controller, initialize } = require("./controller");

const {
  controllerGetTodos,
  controllerRemoveTodo,
  controllerAddTodo,
  controllerAddTodoUser,
  controllerRemoveTodoUser,
} = require("./controllers/todoController");

const {
  controllerGetMitarbeiter,
  controllerAddUser,
  controllerRemoveUser,
} = require("./controllers/mitarbeiterController");

async function renderTodos() {
  const todos = await controllerGetTodos();
  console.log("todos", todos);

  $("#todos_list").html("");

  todos.map((todo) => {
    $("#todos_list").append(`
      <div class="todo">
        <div class="todo-header">
          <button
            class="checkbox-button"
            onclick="removeTodo(${todo.id})"
          ></button>
          <span class="typo-main">${todo.beschreibung}</span>
        </div>
        <div class="todo-users">
          ${todo.mitarbeiter.map((user) => {
            return `
              <button class="user-avatar" onclick="removeTodoUser(${todo.id}, ${
              user.id
            })">
                <span class="typo-main">
                  ${user.vorname.substring(0, 1)}
                </span>
              </button>
        `;
          })}
          <button class="user-avatar-add" onclick="openTodoUserAddModal(${
            todo.id
          })">
            <span class="material-icons">add</span>
          </button>
        </div>
      </div>`);
  });
}

async function removeTodo(id) {
  await controllerRemoveTodo(id);
  renderTodos();
}

async function addTodo(name) {
  await controllerAddTodo(name);
  renderTodos();
}

async function addTodoUser(todoid, userid) {
  await controllerAddTodoUser(todoid, userid);
  renderTodos();
}

async function removeTodoUser(todoid, userid) {
  await controllerRemoveTodoUser(todoid, userid);
  renderTodos();
}

async function renderMitarbeiter() {
  const mitarbeiter = await controllerGetMitarbeiter();
  console.log("mitarbeiter", mitarbeiter);

  $("#mitarbeiter_list").html("");

  mitarbeiter.map((user) => {
    $("#mitarbeiter_list").append(`<div class="user">
    <div class="user-avatar">
      <span class="typo-main">${user.vorname.substring(0, 1)}</span>
    </div>
    <span class="typo-main grow">
      ${user.vorname} ${user.nachname}
    </span>
    <button class="user-avatar-remove" onclick="removeUser(${user.id})">
      <span class="material-icons">delete</span>
    </button>
    </div>`);
  });
}

async function addUser(vorname, nachname) {
  await controllerAddUser(vorname, nachname);
  renderMitarbeiter();
}

async function removeUser(id) {
  await controllerRemoveUser(id);
  renderMitarbeiter();
  renderTodos();
}

async function openTodoAddModal() {
  $("#modals").html(`
    <div id="todos_add_modal" class="modal" onclick="closeModals()">
      <div class="dialog">
        <form id="todos_add_modal_form">
          <input class="input" id="todos_add_modal_name" type="text" placeholder="Todo-Name"></input>
          <button class="button" type="submit">Hinzufügen</button>
        </form>
      </div>
    </div>`);
  $(".dialog").on("click", (event) => {
    event.stopPropagation();
  });
  $("#todos_add_modal_form").on("submit", (event) => {
    event.preventDefault();
    const name = $("#todos_add_modal_name").val();
    if (name) {
      addTodo(name);
      closeModals();
    }
  });
}

async function openUserAddModal() {
  $("#modals").html(`
  <div id="user_add_modal" class="modal" onclick="closeModals()">
    <div class="dialog">
      <form id="user_add_modal_form">
        <input class="input" id="user_add_modal_vorname" type="text" placeholder="Vorname"></input>
        <input class="input" id="user_add_modal_nachname"type="text" placeholder="Nachname"></input>
        <button class="button" type="submit">Hinzufügen</button>
      </form>
    </div>
  </div>`);
  $(".dialog").on("click", (event) => {
    event.stopPropagation();
  });
  $("#user_add_modal_form").on("submit", (event) => {
    event.preventDefault();
    const vorname = $("#user_add_modal_vorname").val();
    const nachname = $("#user_add_modal_nachname").val();
    if (vorname && nachname) {
      addUser(vorname, nachname);
      closeModals();
    }
  });
}

async function openTodoUserAddModal(id) {
  $("#modals").html(`
  <div id="todos_user_add_modal" class="modal" onclick="closeModals()">
    <div class="dialog">
      <form id="todos_user_add_from">
        <select id="todos_user_add_select">${(
          await controllerGetMitarbeiter()
        ).map((user) => {
          return `<option value="${user.id}">${user.vorname} ${user.nachname}</option>`;
        })}</select>
        <button class="button" type="submit">Hinzufügen</button>
      </form>
    </div>
  </div>`);
  $(".dialog").on("click", (event) => {
    event.stopPropagation();
  });
  $("#todos_user_add_from").on("submit", (event) => {
    event.preventDefault();
    const select = $("#todos_user_add_select").val();
    if (select) {
      addTodoUser(id, select);
      closeModals();
    }
  });
}

async function closeModals() {
  $("#modals").html("");
}

$(() => {
  initialize().then(() => {
    renderTodos();
    renderMitarbeiter();
  });
});
