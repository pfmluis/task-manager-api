import buildMakeAddUser from './create-user';
import db from '../../../data'
import validatePassword from '../../entities/validators/password-validator';
import encryptor from '../../../utils/encrypt';
import tokenManager from '../../../utils/token';
import entities from '../../entities'
import buildMakeAuthentication from './user-login';

const userDb = db.userDb
const roleDb = db.roleDb
const makeUser = entities.makeUser
const makeUserLogin = entities.makeUserLogin

const makeAddUser = buildMakeAddUser({ userDb, roleDb, validatePassword, encryptor, makeUser })
const makeAuthentication = buildMakeAuthentication({ userDb, encryptor, makeUserLogin, makeUser, tokenManager })

const authService = Object.freeze({ makeAddUser, makeAuthentication })

export default authService