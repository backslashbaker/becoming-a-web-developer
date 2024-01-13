const express = require('express')
const path = require('path')
const { getTodos } = require('./todos')
const { renderTodos } = require('./utils')

const app = express()
const port = 8000



app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <title>My To Do List</title>
    <link rel="stylesheet" href="./mystyle.css">
  </head>
  
  <body>
    <header>
      <h1>My To Do List</h1>
    </header>
    <main>
      ${renderTodos(getTodos('shopping'))}
    </main>
  
    <h2>New Todo</h2>
    <form>
      <input type="text" name="newTodo" value="">
      <input type="submit" name="submitTodo" value="create">
    </form>
  </body>
  `)
})

app.get('/css/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'assests/mystyle.css'))
})

app.listen(port, () => {
  console.log(`Server Side Rendering app listening on port ${port}`)
})
