import { InvalidEntityException } from '../../entities/exceptions/invalid-entity'

export default async function buildMakeAddUser({
  userDb,
  roleDb,
  validatePassword,
  encryptor,
  makeUser
}) {
  return (userData) => {

    const { password, ...userInfo } = userData

    const { isValid, error } = validatePassword(password)

    if (!isValid) throw new InvalidEntityException(error)

    const role = await roleDb.findOneByName(userInfo.role)

    if (!role) throw new InvalidEntityException(`Role ${userInfo.role} could not be found`)

    try {
      const hashedPassword = await encryptor.encrypt(password)
    
      const user = makeUser({ ...userInfo, hash: hashedPassword })

    return userDb.create({
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
      throw new Error()
    }
  }
}