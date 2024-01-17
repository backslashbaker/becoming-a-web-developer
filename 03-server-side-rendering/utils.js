function createTodoItem(todo) {
  return `
    <li id="todo-${todo.id}" class="${
    todo.complete ? 'complete' : 'incomplete'
  }" style="list-style-type: none;">
      <p>${todo.task}</p>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
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

function createPage(todoListHTML) {
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
      <ul>
        ${todoListHTML}
      </ul>
    </body>
    </html>
  `
}

module.exports = { createTodoList, createPage }
