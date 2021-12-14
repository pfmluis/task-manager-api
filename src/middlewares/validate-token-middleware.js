export default function makeValidateTokenMiddleware({ validateToken }) {
  return async (request, response, next) => {
    const token = require?.headers?.authorization?.replace('Bearer ','')
    const user = await validateToken(token)

    request.user = user

    next()
  }
}