import authService from '../../domain/use-cases/auth'
import makeCreateUserController from './create-user-controller'
import makeLoginUserController from './login-user-controller'

const createUser = authService.addUser
const userLogin = authService.authenticate

const createUserController = makeCreateUserController({ createUser })
const loginUserController = makeLoginUserController({ userLogin })

const authControllers = Object.freeze({ createUserController, loginUserController })
export default authControllers