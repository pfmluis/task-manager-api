import makeId from './id'
import userValidator from './validators/user-validator'
import buildMakeUser from './user'
import buildMakeUserLogin from './user-login'
import userLoginValidator from './validators/user-login-validator'
import buildMakeUserFromToken from './user-from-token'
import userFromTokenValidator from './validators/user-from-token-validator'

const idManager = makeId()

const makeUser = buildMakeUser({ idManager, validator: userValidator })
const makeUserLogin = buildMakeUserLogin({ validator: userLoginValidator })
const makeUserFromToken = buildMakeUserFromToken({ validator: userFromTokenValidator })

const entities = Object.freeze({ makeUser, makeUserLogin, makeUserFromToken })

export default entities