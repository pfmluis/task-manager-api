import makeAddUser from './create-user'
import db from '../../../data'
import validatePassword from '../../entities/validators/password-validator'
import passwordHash from '../../../utils/password-hash'
import tokenManager from '../../../utils/token'
import entities from '../../entities'
import makeAuthenticate from './user-login'
import makeValidateToken from './validate-token'

const userDb = db.userDb
const roleDb = db.roleDb
const makeUser = entities.makeUser
const makeUserLogin = entities.makeUserLogin
const makeUserFromToken = entities.makeUserFromToken

const addUser = makeAddUser({ userDb, roleDb, validatePassword, passwordHash, makeUser })
const authenticate = makeAuthenticate({ userDb, passwordHash, makeUserLogin, makeUser, tokenManager })
const validateToken = makeValidateToken({ makeUserFromToken, tokenManager })

const authService = Object.freeze({ addUser, authenticate, validateToken })

export default authService