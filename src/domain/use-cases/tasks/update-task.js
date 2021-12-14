import { ForbiddenException } from '../../entities/exceptions/frobidden'
import { InvalidEntityException } from '../../entities/exceptions/invalid-entity'

export default function makeUpdateTask({ makeTask, updateTaskValidator, encryptor, taskDb }) {
  return async (sid, taskData, user) => {
    const { isValid, error } = updateTaskValidator(taskData)
    if (!isValid) throw InvalidEntityException(error)

    const task = makeTask(await taskDb.findBySid(sid))
    if (task.getExecutedBy() !== user.getSid()) throw new ForbiddenException('Unreachable resource')

    const newTask = makeTask({ 
      sid: task.getSid(),
      executedAt: task.getExecutedAt(),
      executedBy: task.getExecutedBy(),
      summary: task.getSummary(),
      createdAt: task.getCreatedAt(),
      ...taskData,
      updatedAt: new Date()
    })
    const decryptedSummary = newTask.getSummary()
    const encryptedSummary = encryptor.encrypt(newTask.getSummary())
    newTask.setSummary(JSON.stringify(encryptedSummary))

    await taskDb.updateOne(task.getSid(), {
      summary: newTask.getSummary(),
      executedAt: newTask.getExecutedAt(),
      updatedAt: newTask.getUpdatedAt()
    })

    return {
      sid: newTask.getSid(),
      summary: decryptedSummary,
      executedBy: newTask.getExecutedBy(),
      executedAt: newTask.getExecutedAt(),
      createdAt: newTask.getCreatedAt(),
      updatedAt: newTask.getUpdatedAt(),
    }
  }
}