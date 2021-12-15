import makeFakeUser from '../../../../__test__/mocks/entities/user';
import { roleDbStub } from '../../../../__test__/stubs/db/role-db';
import { userDbStub } from '../../../../__test__/stubs/db/user-db';
import { validatePasswordStub } from '../../../../__test__/stubs/entities/password-validator';
import { makeUserStub } from '../../../../__test__/stubs/entities/user';
import { passwordHashStub } from '../../../../__test__/stubs/utils/password-hash';
import makeAddUser from './create-user';

const sut = makeAddUser({
  userDb: userDbStub,
  roleDb: roleDbStub,
  makeUser: makeUserStub,
  passwordHash: passwordHashStub,
  validatePassword: validatePasswordStub
})

describe('makeAddUser', () => {

  it('should validate the provided password', async () => {
    const user = makeFakeUser()
    const passwordStub = jest.fn().mockImplementationOnce(() => ({ isValid: true }))
    const sut = makeAddUser({
      userDb: userDbStub,
      roleDb: roleDbStub,
      makeUser: makeUserStub,
      passwordHash: passwordHashStub,
      validatePassword: passwordStub
    })
    jest.spyOn(userDbStub, 'findByEmail').mockImplementationOnce(() => undefined)
    await sut(user)

    expect(passwordStub).toHaveBeenCalled()
  })

  it('should throw if provided password is invalid ', async () => {
    const user = makeFakeUser()
    const passwordStub = jest.fn().mockImplementationOnce(() => ({ isValid: false, error: new Error() }))
    const sut = makeAddUser({
      userDb: userDbStub,
      roleDb: roleDbStub,
      makeUser: makeUserStub,
      passwordHash: passwordHashStub,
      validatePassword: passwordStub
    })

    await expect(sut(user)).rejects.toThrow()
  })

  it('should search for existing email if executedAt is not a date', async () => {
    const user = makeFakeUser()
    const findByEmailSpy = jest.spyOn(userDbStub, 'findByEmail').mockImplementationOnce(() => undefined)
    await sut(user)

    expect(findByEmailSpy).toHaveBeenCalled()
  })

  it('should throw if the email is being user', async () => {
    const user = makeFakeUser()
    jest.spyOn(userDbStub, 'findByEmail').mockImplementationOnce(makeFakeUser)
    await expect(sut(user)).rejects.toThrow()
  })

  it('should look for existing role', async () => {
    const user = makeFakeUser()
    jest.spyOn(userDbStub, 'findByEmail').mockImplementationOnce(() => undefined)
    const findRoleByNameSpy = jest.spyOn(roleDbStub, 'findOneByName')
    await sut(user)
    expect(findRoleByNameSpy).toHaveBeenCalled()
  })

  it('should throw if role does not exist', async () => {
    const user = makeFakeUser()
    jest.spyOn(userDbStub, 'findByEmail').mockImplementationOnce(() => undefined)
    jest.spyOn(roleDbStub, 'findOneByName').mockImplementationOnce(() => undefined)
    await expect(sut(user)).rejects.toThrow()
  })

  it('should hash password', async () => {
    const user = makeFakeUser()
    jest.spyOn(userDbStub, 'findByEmail').mockImplementationOnce(() => undefined)
    const passwordEncryptSpy = jest.spyOn(passwordHashStub, 'encrypt')
    await sut(user)
    expect(passwordEncryptSpy).toHaveBeenCalled()
  })

  it('should save user in DB', async () => {
    const user = makeFakeUser()
    jest.spyOn(userDbStub, 'findByEmail').mockImplementationOnce(() => undefined)
    const createUserSpy = jest.spyOn(userDbStub, 'createUser')
    await sut(user)
    expect(createUserSpy).toHaveBeenCalled()
  })

  it('should return valid user if valid data is provided', async () => {
    const user = makeFakeUser()
    jest.spyOn(userDbStub, 'findByEmail').mockImplementationOnce(() => undefined)
    jest.spyOn(userDbStub, 'createUser').mockImplementationOnce(() => user)
    const result = await sut(user)

    expect(result).toMatchObject(user)
  })
})
