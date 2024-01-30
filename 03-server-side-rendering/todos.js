let todos = {
  default: {
    name: 'Default',
    todos: [
      { id: 1, task: 'Learn some HTML', complete: false },
      { id: 2, task: 'Learn some CSS', complete: false },
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
  const list = todos[listId]
  if (!list) {
    throw new Error(`List ${listId} not found`)
  }

  const existingTodos = getTodos(listId)
  existingTodos.forEach((existingTodo) => {
    if (existingTodo.id === todo.id) {
      existingTodo.complete = todo.complete
      existingTodo.task = todo.task
    }
  })
}

function deleteTodo(listId, taskId) {
  const list = todos[listId]
  if (!list) {
    throw new Error(`List ${listId} not found`)
  }

  const existingTodos = getTodos(listId)
  const newTodos = existingTodos.filter(
    (existingTodo) => existingTodo.id !== taskId
  )
  list.todos = newTodos
}

module.exports = { getLists, getTodos, updateTodo, deleteTodo }
