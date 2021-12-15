import makeFakeTask from '../../../../__test__/mocks/entities/task';
import { makeTaskStub } from '../../../../__test__/stubs/entities/task';
import { makeUserStub } from '../../../../__test__/stubs/entities/user';
import { encryptorSub } from '../../../../__test__/stubs/utils/encryptor';
import makeCreateTask from './create-task';

const createTaskValidatorStub = jest.fn().mockImplementation(() => ({ isValid: true }))
const notifyTaskCreatedStub = jest.fn().mockImplementation(() => Promise.resolve())
const taskDbStub = { createTask: (task) => task }

const sut = makeCreateTask({
  makeTask: makeTaskStub,
  createTaskValidator: createTaskValidatorStub,
  encryptor: encryptorSub,
  taskDb: taskDbStub,
  notifyTaskCreated: notifyTaskCreatedStub
})

describe('makeCreateTask', () => {

  it('should validate the provided task data', async () => {
    const task = makeFakeTask()
    const user = makeUserStub()
    await sut(task, user)

    expect(createTaskValidatorStub).toHaveBeenCalled()
  })

  it('should throw if provided task data is invalid ', async () => {
    const task = makeFakeTask()
    const user = makeUserStub()
    const createTaskValidatorStub = jest.fn().mockImplementationOnce(() => ({ isValid: false }))
    const sut = makeCreateTask({
      makeTask: makeTaskStub,
      createTaskValidator: createTaskValidatorStub,
      encryptor: encryptorSub,
      taskDb: taskDbStub,
      notifyTaskCreated: notifyTaskCreatedStub
    })
    await expect(sut(task, user)).rejects.toThrow()
  })

  it('should encrypt the summary', async () => {
    const task = makeFakeTask()
    const user = makeUserStub()
    const encryptSpy = jest.spyOn(encryptorSub, 'encrypt')
    await sut(task, user)

    expect(encryptSpy).toHaveBeenCalled()
  })

  it('should store task in db', async () => {
    const task = makeFakeTask()
    const user = makeUserStub()
    const createTaskSpy = jest.spyOn(taskDbStub, 'createTask')
    await sut(task, user)

    expect(createTaskSpy).toHaveBeenCalled()
  })

  it('should notify managers', async () => {
    const task = makeFakeTask()
    const user = makeUserStub()
    await sut(task, user)

    expect(notifyTaskCreatedStub).toHaveBeenCalled()
  })

  it('should not throw if notify manager throws', async () => {
    const task = makeFakeTask()
    const user = makeUserStub()
    const notifyTaskCreatedStub = jest.fn().mockImplementationOnce(() => Promise.reject())
    const sut = makeCreateTask({
      makeTask: makeTaskStub,
      createTaskValidator: createTaskValidatorStub,
      encryptor: encryptorSub,
      taskDb: taskDbStub,
      notifyTaskCreated: notifyTaskCreatedStub
    })
    await expect(() => sut(task, user)).not.toThrow()
  })
})
