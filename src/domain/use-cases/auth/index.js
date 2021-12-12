import buildMakeAddUser from './create-user';
import db from '../../../data'
import validatePassword from '../../entities/validators/password-validator';
import encryptor from '../../../utils/encrypt';
import entities from '../../entities'

const userDb = db.userDb
const roleDb = db.userDb
const makeUser = entities.makeUser

const makeAddUser = buildMakeAddUser({ userDb, roleDb, validatePassword, encryptor, makeUser })

const authService = Object.freeze({ makeAddUser })

export default authService