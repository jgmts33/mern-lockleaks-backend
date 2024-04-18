const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3090
const cors = require('cors');

app.use(cors());

const users = require('./controllers/signusers')

app.use(bodyParser.json())


app.get('/', async(request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', users.getUsers)
app.get('/users/:id', users.getUserById)
app.post('/users', users.createUsers)
app.put('/users/:id', users.updateUser)
app.delete('/users/:id', users.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})