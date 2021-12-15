import makeFakeTask from '../../../../__test__/mocks/entities/task'
import { encryptorSub } from '../../../../__test__/stubs/utils/encryptor'
import makeFindTasks from './find-tasks'
import { v4 } from 'uuid'
import { Permissions } from '../../../constants/permissions'

const user = { getSid: () => v4(), getPermissions: () => [] }
const summary = '{"iv":"asdasdasd","content":"aasdasdasdasdasdasd"}'
const taskDbStub = {
  findAll: () => [makeFakeTask({ summary }), makeFakeTask({ summary })],
  findByUserSid: () => [makeFakeTask({ summary })]
}

const sut = makeFindTasks({
  encryptor: encryptorSub,
  taskDb: taskDbStub,
})

describe('makeFindTasks', () => {

  it('should find all tasks if user has READ_ALL_PERMISSIONS', async () => {
    const user = { getSid: () => v4(), getPermissions: () => [Permissions.READ_ALL_TASKS] }
    const findAllSpy = jest.spyOn(taskDbStub, 'findAll')

    await sut(user)

    expect(findAllSpy).toHaveBeenCalled()
  })

  it('should find user tasks if user does not have READ_ALL_PERMISSIONS', async () => {
    const findByUserSidSpy = jest.spyOn(taskDbStub, 'findByUserSid')

    await sut(user)

    expect(findByUserSidSpy).toHaveBeenCalled()
  })

  it('should decrypt all summaries', async () => {
    const user = { getSid: () => v4(), getPermissions: () => [Permissions.READ_ALL_TASKS] }
    const encryptorSpy = jest.spyOn(encryptorSub, 'decrypt')
    const resultSize = taskDbStub.findAll().length

    await sut(user)

    expect(encryptorSpy).toHaveBeenCalledTimes(resultSize)
  })
})
