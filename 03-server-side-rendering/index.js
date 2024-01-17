const express = require('express')
const path = require('path')
const { getTodos } = require('./todos')
const { createTodoList, createPage } = require('./utils')
const bodyParser = require('body-parser')

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))

function addTodos(listId, todos) {
  todos[listId] = { name: listId, todos: [] }
}

app.get('/', (req, res) => {
  const pageHtml = createPage(`<h1>Todo Lists</h1>
    <ul>
      <li><a href="/lists/default">Default</a></li>
      <li><a href="/lists/shopping">Shopping</a></li>
    </ul>`)
  res.send(pageHtml)
})

app.get('/lists/:listId', (req, res) => {
  const todos = getTodos(req.params.listId)
  const todoListHtml = createTodoList(todos)
  const pageHtml = createPage(todoListHtml, req.params.listId)
  res.send(pageHtml)
})

app.post('/lists/:listId/add-todo', (req, res) => {
  const newTodo = req.body.task;
  const listId = req.params.listId;
  let todos = getTodos(listId);
  
  if (!todos) {
    addTodos(listId, []);
    todos = getTodos(listId);
  }

  todos.push({
    id: todos.length + 1,
    task: newTodo,
    complete: false,
  });

  res.redirect(`/lists/${listId}`);
});

app.get('/css/style.css', (req, res) => {
  res.sendHeader(200, { 'Content-Type': 'text/css' })
  res.sendFile(path.join(__dirname, 'assests/mystyle.css'))
})

app.listen(port, () => {
  console.log(`Server Side Rendering app listening on port ${port}`)
})
