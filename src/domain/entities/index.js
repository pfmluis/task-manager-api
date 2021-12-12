import makeId from './id'
import userValidator from './validators/user-validator'
import buildMakeUser from './user'

const idManager = makeId()
const makeUser = buildMakeUser({ idManager, validator: userValidator })

export default {
  makeUser
}