export default function makeTaskDb({ connection }) {
  
  async function createTask(task) {
    const newTask = mapCreateTaskData(task)
    await connection('task').insert(newTask)

    return task
  }

  async function findBySid(sid) {
    const task = await connection('task').where('sid', sid).first()

    return mapToTaskEntity(task)
  }

  async function updateOne(sid, newTask) {
    const task = mapUpdateTaskData(newTask)
    await connection('task')
      .where('sid', sid)
      .update(task)

    return true
  }

  function deleteOne(sid) {
    return connection('task')
      .where('sid', sid)
      .first()
      .del()
  }

  function mapCreateTaskData(task) {
    const { executedAt, createdAt, updatedAt, executedBy, ...taskData } = task

    return { 
      ...taskData,
      user_sid: executedBy,
      executed_at: executedAt,
      created_at: createdAt,
      updated_at: updatedAt
    }
  }

  function mapUpdateTaskData(task) {
    const { executedBy, summary, updatedAt } = task

    return { 
      summary,
      user_sid: executedBy,
      updated_at: updatedAt
    }
  }

  function mapToTaskEntity(task) {
    if (!task) return
    const { executed_at, created_at, updated_at, user_sid, ...taskData } = task

    return { 
      ...taskData,
      executedBy: user_sid,
      executedAt: executed_at,
      createdAt: created_at,
      updatedAt: updated_at
    }
  }

  return Object.freeze({
    createTask,
    findBySid,
    updateOne,
    deleteOne
  })
}