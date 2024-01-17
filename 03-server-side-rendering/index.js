const express = require('express')
const path = require('path')
const { getTodos } = require('./todos')
const { createTodoList, createPage } = require('./utils')

const app = express()
const port = 8000

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
  const pageHtml = createPage(todoListHtml)
  res.send(pageHtml)
})

app.get('/css/style.css', (req, res) => {
  res.sendHeader(200, { 'Content-Type': 'text/css' })
  res.sendFile(path.join(__dirname, 'assests/mystyle.css'))
})

app.listen(port, () => {
  console.log(`Server Side Rendering app listening on port ${port}`)
})
