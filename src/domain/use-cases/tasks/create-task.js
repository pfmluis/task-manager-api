import { InvalidEntityException } from '../../entities/exceptions/invalid-entity'

export default function makeCreateTask({ makeTask, createTaskValidator, encryptor, taskDb, notifyTaskCreated }) {
  return async (taskData, user) => {
    const { isValid, error } = createTaskValidator(taskData)

    if (!isValid) throw InvalidEntityException(error)

    const task = makeTask({ ...taskData, executedBy: user.getSid() })
    const decryptedSummary = task.getSummary()
    const encryptedSummary = encryptor.encrypt(task.getSummary())
    task.setSummary(JSON.stringify(encryptedSummary))

    const createdTask = await taskDb.createTask({
      sid: task.getSid(),
      summary: task.getSummary(),
      executedBy: task.getExecutedBy(),
      executedAt: task.getExecutedAt()
    })

    notifyTaskCreated(createdTask)
      .catch(console.error)

    return {
      ...createdTask,
      summary: decryptedSummary
    }
  }
}