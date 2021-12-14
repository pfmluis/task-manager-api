export default function makeLoginUserController({ userLogin }) {
  return async (httpRequest) => {
    const userData = httpRequest.body
    const authentication = await userLogin(userData)

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: authentication
    }
  }
}