export default function makeCreateUserController({ createUser }) {
  return async (httpRequest) => {
    const userData = httpRequest.body
    const newUser = await createUser(userData)

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 201,
      body: newUser
    }
  }
}