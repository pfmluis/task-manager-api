export default function makeCreateTaskController({ createTask }) {
  return async (httpRequest) => {
    const taskData = httpRequest.body
    const user = httpRequest.user
    const newTask = await createTask(taskData, user)

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 201,
      body: newTask
    }
  }
}