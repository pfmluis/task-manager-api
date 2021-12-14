import { InvalidEntityException } from '../../entities/exceptions/invalid-entity'

export default function makeAddUser({ userDb, roleDb, validatePassword, passwordHash, makeUser }) {
  return async (userData) => {
    const { password, ...userInfo } = userData
    const { isValid, error } = validatePassword(password)

    if (!isValid) throw new InvalidEntityException(error)

    const userExists = await userDb.findByEmail(userInfo.email)

    if (userExists) throw new InvalidEntityException('The email is already in use')

    const roleExists = await roleDb.findOneByName(userInfo.role)

    if (!roleExists) throw new InvalidEntityException(`Role ${userInfo.role} could not be found`)

    try {
      const hashedPassword = await passwordHash.encrypt(password)
      const user = makeUser({ ...userInfo, hash: hashedPassword })

      return userDb.createUser({
        sid: user.getSid(),
        name: user.getName(),
        email: user.getEmail(),
        hash: user.getHash(),
        role: user.getRole(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt()
      })
    } catch (error) {
      // TODO: Create custom error
      throw error
    }
  }
}