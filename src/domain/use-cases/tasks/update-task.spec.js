import faker from 'faker'
import { v4 } from 'uuid'
import makeFakeTask from '../../../../__test__/mocks/entities/task'
import { makeUserStub } from '../../../../__test__/stubs/entities/user'
import { encryptorSub } from '../../../../__test__/stubs/utils/encryptor'
import makeUpdateTask from './update-task'

const sid = 'validSid'
const user = makeUserStub()
const task = makeFakeTask({ executedBy: user.getSid() })

const updateTaskValidatorStub = jest.fn().mockImplementation(() => ({ isValid: true }))
const taskDbStub = { 
  updateOne: () => task,
  findBySid: () => makeFakeTask({ executedBy: user.getSid() })
}

const makeTaskStub = () => {
  return {
    getSid: () => v4(),
    getExecutedAt: () => faker.date.recent(),
    getSummary: () => faker.lorem.paragraphs(),
    setSummary: (newSummary) => {},
    getExecutedBy: () => user.getSid(),
    getCreatedAt: () => faker.date.past(),
    getUpdatedAt: () => faker.date.recent(),
  }
}

const sut = makeUpdateTask({
  makeTask: makeTaskStub,
  updateTaskValidator: updateTaskValidatorStub,
  encryptor: encryptorSub,
  taskDb: taskDbStub
})

describe('makeCreateTask', () => {

  it('should validate the provided task data', async () => {
    await sut(sid, task, user)

    expect(updateTaskValidatorStub).toHaveBeenCalled()
  })

  it('should throw if validation fails', async () => {
    const updateTaskValidatorStub = jest.fn().mockImplementation(() => ({ isValid: false }))
    const sut = makeUpdateTask({
      makeTask: makeTaskStub,
      updateTaskValidator: updateTaskValidatorStub,
      encryptor: encryptorSub,
      taskDb: taskDbStub
    })
    await expect(sut(task, user)).rejects.toThrow()
  })

  it('should encrypt the provided summary', async () => {
    const encryptorSpy = jest.spyOn(encryptorSub, 'encrypt')
    await sut(sid, task, user)

    expect(encryptorSpy).toHaveBeenCalled()
  })

  it('should update the record in the database', async () => {
    const updateOneSpy = jest.spyOn(taskDbStub, 'updateOne')
    await sut(sid, task, user)

    expect(updateOneSpy).toHaveBeenCalled()
  })
})
