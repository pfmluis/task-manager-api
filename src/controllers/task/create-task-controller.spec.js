import makeFakeTask from '../../../__test__/mocks/entities/task'
import makeCreateUserController from '../auth/create-user-controller'
import makeCreateTaskController from './create-task-controller'

const task = makeFakeTask()
const createTaskStub = () => task
const sut = makeCreateTaskController({ createTask: createTaskStub })
const httpRequest = {
  body: task,
}

describe('makeCreateUserController', () => {

  it('should return 201 if createUser succeeds', async () => {
    const result = await sut(httpRequest)

    expect(result.statusCode).toBe(201)
  })

  it('should throw if createUser throws', async () => {
    const createUserStub = () => { throw new Error() }
    const sut = makeCreateUserController({ createUser: createUserStub })

    await expect(sut(httpRequest)).rejects.toThrow()
  })
})
