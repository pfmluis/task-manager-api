import makeFakeUser from '../../../__test__/mocks/entities/user'
import makeCreateUserController from './create-user-controller'

const user = makeFakeUser()
const createUserStub = () => user
const sut = makeCreateUserController({ createUser: createUserStub })
const httpRequest = {
  body: makeFakeUser(),
}

describe('makeCreateUserController', () => {

  it('should return 201 if createUser succeeds', async () => {
    const result = await sut(httpRequest)

    expect(result.statusCode).toBe(201)
  })

  it('should throw if createUser throws', async () => {
    const createUserStub = () => { throw new Error() }
    const sut = makeCreateUserController({ createUser: createUserStub })

    await expect(sut(user)).rejects.toThrow()
  })
})
