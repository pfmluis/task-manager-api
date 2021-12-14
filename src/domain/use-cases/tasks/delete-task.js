import { NotFoundException } from '../../entities/exceptions/not-found'

export default function makeDeleteTask({ makeTask, taskDb }) {
  return async (sid) => {
    const taskData = await taskDb.findBySid(sid)
    if (!taskData) throw new NotFoundException(`The task with the sid [${sid}] could not be found`)

    const task = makeTask(taskData)
    await taskDb.deleteOne(sid)

    return {
      sid: task.getSid(),
      executedBy: task.getExecutedBy(),
      executedAt: task.getExecutedAt(),
      createdAt: task.getCreatedAt(),
      updatedAt: task.getUpdatedAt(),
    }
  }
}