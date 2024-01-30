const express = require('express')
const path = require('path')
const { getTodos, updateTodo, deleteTodo } = require('./todos')
const { createTodoList, createPage } = require('./utils')
const bodyParser = require('body-parser')
const { encode } = require('html-entities')

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  const escapedBody = Object.fromEntries(
    Object.entries(req.body).map(([key, value]) => [
      key,
      typeof value === 'string' ? encode(value) : value,
    ])
  )
  req.body = escapedBody
  next()
})

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
  const newTodo = req.body.task
  const listId = req.params.listId
  let todos = getTodos(listId)

  if (!todos) {
    addTodos(listId, [])
    todos = getTodos(listId)
  }

  todos.push({
    id: todos.length + 1,
    task: newTodo,
    complete: false,
  })

  res.redirect(`/lists/${listId}`)
})

app.post('/lists/:listId/update-todos', (req, res) => {
  const listId = req.params.listId

  if (req.body.delete) {
    deleteTodo(listId, Number(req.body.delete))
  } else {
    const completedTasks = Object.keys(req.body).map((key) =>
      key.replace('complete-', '')
    )
    for (const completedTask of completedTasks) {
      const todo = getTodos(listId).find(
        (todo) => todo.id === Number(completedTask)
      )
      todo.complete = true
      updateTodo(listId, todo)
    }
  }
  res.redirect(`/lists/${listId}`)
})

app.get('/css/style.css', (req, res) => {
  res.sendHeader(200, { 'Content-Type': 'text/css' })
  res.sendFile(path.join(__dirname, 'assests/mystyle.css'))
})

app.listen(port, () => {
})
