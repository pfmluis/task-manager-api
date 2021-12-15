import makeFakeTask from '../../../__test__/mocks/entities/task'
import makeFakeUser from '../../../__test__/mocks/entities/user'
import makeFindTaskController from './find-tasks-controller'

const tasks = [makeFakeTask()]
const findTasksStub = () => tasks
const sut = makeFindTaskController({ findTasks: findTasksStub })
const httpRequest = {
  body: tasks,
  user: makeFakeUser
}

describe('makeCreateUserController', () => {

  it('should return 200 if createUser succeeds', async () => {
    const result = await sut(httpRequest)

    expect(result.statusCode).toBe(200)
  })


  it('should throw if createUser throws', async () => {
    const findTasksStub = () => { throw new Error() }
    const sut = makeFindTaskController({ findTasks: findTasksStub })

    await expect(sut(tasks)).rejects.toThrow()
  })
})
