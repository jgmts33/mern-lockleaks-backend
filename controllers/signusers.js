const {Pool,Client} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lockleaks',
  password: '123',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const findUser = (request, response) => {
  const {email,password} = request.body;
  pool.query('SELECT * FROM users WHERE email = $1 password = $2', [email,password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUsers = async (request, response) => {
  const { email, password } = request.body;
  const client = await pool.connect();
  try {
    const results = await client.query('INSERT INTO users (email,password ) VALUES ($1,$2)', [email,password]);
    response.status(201).send(`Employee added with ID: ${results.insertId}`);
  } catch (e) {
    console.log("err:", e);
  } finally {
    client.release();
  }
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  updateUser,
  deleteUser,
  findUser
}