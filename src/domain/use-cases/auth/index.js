import buildMakeAddUser from './create-user'
import db from '../../../data'
import validatePassword from '../../entities/validators/password-validator'
import encryptor from '../../../utils/encrypt'
import tokenManager from '../../../utils/token'
import entities from '../../entities'
import buildMakeAuthentication from './user-login'
import buildMakeValidateToken from './validate-token'

const userDb = db.userDb
const roleDb = db.roleDb
const makeUser = entities.makeUser
const makeUserLogin = entities.makeUserLogin
const makeUserFromToken = entities.makeUserFromToken

const makeAddUser = buildMakeAddUser({ userDb, roleDb, validatePassword, encryptor, makeUser })
const makeAuthentication = buildMakeAuthentication({ userDb, encryptor, makeUserLogin, makeUser, tokenManager })
const makeValidateToken = buildMakeValidateToken({ makeUserFromToken, tokenManager })

const authService = Object.freeze({ makeAddUser, makeAuthentication, makeValidateToken })

export default authService