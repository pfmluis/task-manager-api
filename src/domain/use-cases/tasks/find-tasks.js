import { Permissions } from '../../../constants/permissions'

export default function makeFindTasks({ encryptor, taskDb }) {
  return async (user) => {
    let tasks = []

    function canUserReadAllTasks(user, permission) {
      return user.getPermissions().includes(permission)
    }

    if (canUserReadAllTasks(user, Permissions.READ_ALL_TASKS)) {
      tasks = [...(await taskDb.findAll())]
    } else {
      tasks = [...(await taskDb.findByUserSid(user.getSid()))]
    }

    return tasks.map(({ summary, ...task }) => ({
      ...task,
      summary: encryptor.decrypt(JSON.parse(summary))
    }))
  }
}