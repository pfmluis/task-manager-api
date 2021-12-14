import authService from '../domain/use-cases/auth'
import makeCheckPermissionsMiddleware from './check-permissions-middleware'
import makeValidateTokenMiddleware from './validate-token-middleware'

const validateToken = authService.validateToken

const validateTokenMiddleware = makeValidateTokenMiddleware({ validateToken })
const checkPermissionsMiddleware = makeCheckPermissionsMiddleware()

const middlewares = Object.freeze({ validateTokenMiddleware, checkPermissionsMiddleware })
export default middlewares