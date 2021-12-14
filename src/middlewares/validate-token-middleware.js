export default function makeValidateTokenMiddleware({ validateToken }) {
  return async (request, response, next) => {
    try {
      const token = request?.headers?.authorization?.replace('Bearer ','')
      const user = await validateToken(token)
  
      request.user = user
  
      next()
    } catch (e) {
      response.status(401).json({ status: 401, message: 'Unauthorized' })
    }
  }
}