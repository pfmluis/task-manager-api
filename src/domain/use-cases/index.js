import buildMakeAddUser from './auth/create-user';

// DB
import { userDb, roleDb } from '../../data'

// Validators
import validatePassword from '../entities/validators/password-validator';

// Utils
import encryptor from '../../utils/encrypt';

// Entities
import { makeUser } from '../entities'

const makeAddUser = buildMakeAddUser({ userDb, roleDb, validatePassword, encryptor, makeUser })