import makeId from './id'
import userValidator from './validators/user-validator'
import buildMakeUser from './user'
import buildMakeUserLogin from './user-login'
import userLoginValidator from './validators/user-login-validator'

const idManager = makeId()

const makeUser = buildMakeUser({ idManager, validator: userValidator })
const makeUserLogin = buildMakeUserLogin({ validator: userLoginValidator })

const entities = Object.freeze({ makeUser, makeUserLogin })

export default entities