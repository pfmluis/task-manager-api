import makeId from '../../utils/id'
import userValidator from './validators/user-validator'
import buildMakeUser from './auth/user'
import buildMakeUserLogin from './auth/user-login'
import userLoginValidator from './validators/user-login-validator'
import buildMakeUserFromToken from './auth/user-from-token'
import userFromTokenValidator from './validators/user-from-token-validator'
import buildMakeTask from './tasks/task'
import taskValidator from './validators/task-validator'

const idManager = makeId()

const makeUser = buildMakeUser({ idManager, validator: userValidator })
const makeUserLogin = buildMakeUserLogin({ validator: userLoginValidator })
const makeUserFromToken = buildMakeUserFromToken({ validator: userFromTokenValidator })

const makeTask = buildMakeTask({ idManager, validator: taskValidator })

const entities = Object.freeze({ makeUser, makeUserLogin, makeUserFromToken, makeTask })

export default entities