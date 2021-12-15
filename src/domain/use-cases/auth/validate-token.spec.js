import makeFakeUser from '../../../../__test__/mocks/entities/user';
import { makeUserStub } from '../../../../__test__/stubs/entities/user';
import { tokenManagerStub } from '../../../../__test__/stubs/utils/token-manager';
import makeValidateToken from './validate-token';

const sut = makeValidateToken({
  makeUserFromToken: makeUserStub,
  tokenManager: tokenManagerStub
})

describe('makeValidateToken', () => {

  it('should validate token', async () => {
    const user = makeFakeUser()
    const tokenVerifySpy = jest.spyOn(tokenManagerStub, 'verify').mockImplementationOnce(() => ({ exp: -Infinity }))
    await sut(user)

    expect(tokenVerifySpy).toHaveBeenCalled()
  })

  it('should throw if token is invalid', async () => {
    const user = makeFakeUser()
    jest.spyOn(tokenManagerStub, 'verify').mockImplementationOnce(Promise.reject)
    await expect(sut(user)).rejects.toThrow()
  })

  it('should throw if token is expired', async () => {
    const user = makeFakeUser()
    jest.spyOn(tokenManagerStub, 'verify').mockImplementationOnce(() => ({ exp: Infinity }))
    await expect(sut(user)).rejects.toThrow()
  })

  it('should return valid token set if valid data is provided', async () => {
    const user = makeFakeUser()
    jest.spyOn(tokenManagerStub, 'verify').mockImplementationOnce(() => ({ exp: -Infinity }))
    const result = await sut(user)

    expect(result).toBeDefined()
  })
})
