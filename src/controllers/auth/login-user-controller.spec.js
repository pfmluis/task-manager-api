import makeFakeUser from '../../../__test__/mocks/entities/user'
import makeLoginUserController from './login-user-controller'

const user = makeFakeUser()
const createUserStub = () => user
const sut = makeLoginUserController({ userLogin: createUserStub })
const httpRequest = {
  body: makeFakeUser(),
}

describe('makeCreateUserController', () => {

  it('should return 200 if createUser succeeds', async () => {
    const result = await sut(httpRequest)

    expect(result.statusCode).toBe(200)
    expect(result.body).toMatchObject(user)
  })

  it('should throw if createUser throws', async () => {
    const createUserStub = () => { throw new Error() }
    const sut = makeLoginUserController({ createUser: createUserStub })

    await expect(sut(user)).rejects.toThrow()
  })
})
