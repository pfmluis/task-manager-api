import { Router } from 'express';
import bodyParser from 'body-parser';
import authControllers from '../controllers/auth'
import makeExpressAdapter from '../utils/express-adapter';

const authRoute = Router()

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

authRoute.post('/register', jsonParser, makeExpressAdapter(authControllers.createUserController))

authRoute.post('/auth/token', urlencodedParser, makeExpressAdapter(authControllers.loginUserController))


export default authRoute