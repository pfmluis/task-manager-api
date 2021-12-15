import makeFakeUser from '../../../../__test__/mocks/entities/user';
import { userDbStub } from '../../../../__test__/stubs/db/user-db';
import { makeUserStub } from '../../../../__test__/stubs/entities/user';
import { makeUserLoginStub } from '../../../../__test__/stubs/entities/user-login';
import { passwordHashStub } from '../../../../__test__/stubs/utils/password-hash';
import { tokenManagerStub } from '../../../../__test__/stubs/utils/token-manager';
import makeAuthenticate from './user-login';

const sut = makeAuthenticate({
  userDb: userDbStub,
  passwordHash: passwordHashStub,
  makeUser: makeUserStub,
  makeUserLogin: makeUserLoginStub,
  tokenManager: tokenManagerStub
})

describe('makeAuthenticate', () => {

  it('should look for user in email', async () => {
    const user = makeFakeUser()
    const findByEmailWithRoleAndPermissionsSpy = jest.spyOn(userDbStub, 'findByEmailWithRoleAndPermissions')
    await sut(user)

    expect(findByEmailWithRoleAndPermissionsSpy).toHaveBeenCalled()
  })

  it('should compare password with hash', async () => {
    const user = makeFakeUser()
    const passwordCompareSpy = jest.spyOn(passwordHashStub, 'compare')
    await sut(user)
    expect(passwordCompareSpy).toHaveBeenCalled()
  })

  it('should throw if password compare fails', async () => {
    const user = makeFakeUser()
    jest.spyOn(passwordHashStub, 'compare').mockImplementationOnce(() => false)
    await expect(sut(user)).rejects.toThrow()
  })

  it('should return valid token set if valid data is provided', async () => {
    const user = makeFakeUser()
    const result = await sut(user)

    expect(result).toBeDefined()
  })
})
