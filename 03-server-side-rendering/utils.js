const renderTodos = (todos) => {
  return `
    <ul>
      ${todos
        .map(
          (todo) => `
        <li>
          <input type="checkbox" ${todo.complete ? 'checked' : ''} />
          ${todo.task}
          <button class="delete">Delete</button>
        </li>
      `
        )
        .join('')}
    </ul>
  `
}

module.exports = { renderTodos }