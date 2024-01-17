let todos = {
  default: {
    name: 'Default',
    todos: [
      { id: 1, task: 'Learn some HTML', complete: true },
      { id: 2, task: 'Learn some CSS', complete: true },
      { id: 3, task: 'Become a web developer', complete: false },
    ],
  },
  shopping: {
    name: 'Shopping List',
    todos: [
      { id: 4, task: 'Buy some milk', complete: false },
      { id: 5, task: 'Buy some bananas', complete: true },
      { id: 6, task: 'Buy some chocolate', complete: false },
    ],
  },
}

function getLists() {
  return Object.entries(todos).map(([id, list]) => ({
    id,
    name: list.name,
    count: list.todos.length,
  }))
}

function getTodos(list = 'default') {
  return todos[list].todos
}

function updateTodo(listId, todo) {
  const list = todos[listId];
  if (!list) {
    throw new Error(`List ${listId} not found`);
  }

  const existingTodos = getTodos(listId);
  existingTodos.forEach(existingTodo => {
    if (existingTodo.id === todo.id) {
      existingTodo.complete = todo['complete-x'] !== undefined ? todo['complete-x'] : existingTodo.complete;
    }
  });
}

module.exports = { getLists, getTodos, updateTodo }
