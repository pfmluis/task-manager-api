import makeFakeTask from '../../../__test__/mocks/entities/task'
import makeUpdateTaskController from './update-task-controller'

const task = makeFakeTask()
const updateTaskStub = () => task
const sut = makeUpdateTaskController({ updateTask: updateTaskStub })
const httpRequest = {
  params: { sid: 'sid' },
  body: task,
}

describe('makeCreateUserController', () => {

  it('should return 200 if updateTask succeeds', async () => {
    const result = await sut(httpRequest)

    expect(result.statusCode).toBe(200)
  })

  it('should throw if updateTask throws', async () => {
    const updateTaskStub = () => { throw new Error() }
    const sut = makeUpdateTaskController({ updateTask: updateTaskStub })

    await expect(sut(httpRequest)).rejects.toThrow()
  })
})
