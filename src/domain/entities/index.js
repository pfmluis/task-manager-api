import makeId from './id'
import userValidator from './validators/user-validator'
import buildMakeUser from './user'

const idManager = makeId()

const makeUser = buildMakeUser({ idManager, validator: userValidator })

const entities = Object.freeze({ makeUser })

export default entities