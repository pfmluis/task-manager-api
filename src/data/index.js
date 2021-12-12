const { default: makeUserDb } = require('./user-db')

const client = process.env.DB_CLIENT
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME

const connection = require('knex')({
  client,
  connection: {
    host,
    port,
    user,
    password,
    database
  }
})

const userDb = makeUserDb({ connection })
const roleDb = makeUserDb({ connection })

export default Object.freeze({
  userDb,
  roleDb
})