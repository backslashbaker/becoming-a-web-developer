function createTodoItem(todo) {
  return `
    <li id="todo-${todo.id}" class="${
    todo.complete ? 'complete' : 'incomplete'
  }" style="list-style-type: none;">
      <input type="checkbox" id="checkbox-${todo.id}" name="complete-${
    todo.id
  }" ${todo.complete ? 'checked' : ''} onclick="toggleTodo(${todo.id})">
      <label for="checkbox-${todo.id}">${todo.task}</label>
      <button name="delete" value="${todo.id}">Delete</button>
    </li>
  `
}

function createTodoList(todos) {
  return `
    <h2>Todo List</h2>
    <ul>
      ${todos.map(createTodoItem).join('')}
    </ul>
  `
}

function createPage(todoListHTML, listId = 'default') {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Todo List</title>
      <style>
        .complete { text-decoration: line-through; }
        .incomplete { text-decoration: none; }
      </style>
      <link rel="stylesheet" href="/assests/mystyle.css" />
    </head>
    <body>
    <form id="todo-list-form" action="/lists/${listId}/update-todos" method="POST">
      <ul>
        ${todoListHTML}
      </ul>
      <button>Save</button>
    </form>
      <h2>Add Todo</h2>
      <form id="new-todo-form" action="/lists/${listId}/add-todo" method="POST">
        <input name="task" />
        <button>Add</button>
      </form>
    </body>
    </html>
  `
}

module.exports = { createTodoList, createPage }
