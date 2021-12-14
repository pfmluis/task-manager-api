export default function makeFindTaskController({ findTasks }) {
  return async (httpRequest) => {
    const user = httpRequest.user
    const tasks = await findTasks(user)

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: tasks
    }
  }
}