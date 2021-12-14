export default function makeUpdateTaskController({ updateTask }) {
  return async (httpRequest) => {
    const sid = httpRequest.params.sid
    const taskData = httpRequest.body
    const user = httpRequest.user
    const updatedTask = await updateTask(sid, taskData, user)

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: updatedTask
    }
  }
}