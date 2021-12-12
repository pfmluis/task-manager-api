import makeUserDb from './user-db'
import makeRoleDb from './role-db'

const connection = require('knex')({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
})

const userDb = makeUserDb({ connection })
const roleDb = makeRoleDb({ connection })

const dbAccessors = Object.freeze({ userDb, roleDb })

export default dbAccessors