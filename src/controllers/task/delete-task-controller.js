export default function makeDeleteTaskController({ deleteTask }) {
  return async (httpRequest) => {
    const sid = httpRequest.params.sid
    const user = httpRequest.user
    const deletedTask = await deleteTask(sid, user)

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: deletedTask
    }
  }
}