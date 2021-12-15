import makeFakeTask from '../../../__test__/mocks/entities/task'
import makeDeleteTaskController from './delete-task-controller'

const task = makeFakeTask()
const deleteTaskStub = () => task
const sut = makeDeleteTaskController({ deleteTask: deleteTaskStub })
const httpRequest = {
  params: { sid: 'sid' },
  body: task,
}

describe('makeDeleteTaskController', () => {

  it('should return 200 if deleteTask succeeds', async () => {
    const result = await sut(httpRequest)

    expect(result.statusCode).toBe(200)
  })


  it('should throw if deleteTask throws', async () => {
    const deleteTaskStub = () => { throw new Error() }
    const sut = makeDeleteTaskController({ deleteTask: deleteTaskStub })

    await expect(sut(httpRequest)).rejects.toThrow()
  })
})
