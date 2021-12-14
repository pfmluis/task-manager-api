export default function makeUpdateTaskController({ updateTask }) {
  return async (httpRequest) => {
    const sid = httpRequest.params.sid
    const updatedTask = await updateTask(sid)

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: updatedTask
    }
  }
}