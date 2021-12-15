import makeFakeTask from '../../../../__test__/mocks/entities/task'
import { encryptorSub } from '../../../../__test__/stubs/utils/encryptor'
import { v4 } from 'uuid'
import { Permissions } from '../../../constants/permissions'
import makeDeleteTask from './delete-task'
import { makeTaskStub } from '../../../../__test__/stubs/entities/task'

const user = { getSid: () => v4(), getPermissions: () => [] }
const taskDbStub = {
  findBySid: () => makeFakeTask(),
  deleteOne: () => makeFakeTask()
}

const sut = makeDeleteTask({
  makeTask: makeTaskStub,
  taskDb: taskDbStub,
})

describe('makeDeleteTask', () => {

  it('should find task before deleting', async () => {
    const findBySidSpy = jest.spyOn(taskDbStub, 'findBySid')
    await sut('sid')

    expect(findBySidSpy).toHaveBeenCalled()
  })

  it('should throw if does not find task', async () => {
    jest.spyOn(taskDbStub, 'findBySid').mockImplementationOnce(() => undefined)

    await expect(() => sut('sid')).rejects.toThrow()
  })

  it('should decrypt all summaries', async () => {
    const deleteOneSpy = jest.spyOn(taskDbStub, 'deleteOne')

    await sut('sid')

    expect(deleteOneSpy).toHaveBeenCalled()
  })
})
