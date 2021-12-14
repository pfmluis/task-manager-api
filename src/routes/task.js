import { Router } from 'express';
import bodyParser from 'body-parser';
import taskControllers from '../controllers/task'
import makeExpressAdapter from '../utils/express-adapter';
import middlewares from '../middlewares/index'
import { Permissions } from '../constants/permissions'

const taskRouter = Router()

taskRouter.use(bodyParser.json())
taskRouter.use(middlewares.validateTokenMiddleware)

taskRouter.post('/tasks',
  middlewares.checkPermissionsMiddleware([Permissions.CREATE_TASKS]),
  makeExpressAdapter(taskControllers.createTaskController)
)

taskRouter.get('/tasks',
  middlewares.checkPermissionsMiddleware([Permissions.READ_ALL_TASKS, Permissions.READ_TASKS]),
  makeExpressAdapter(taskControllers.findTasksController)
)

taskRouter.put('/tasks/:sid',
  middlewares.checkPermissionsMiddleware([Permissions.UPDATE_TASKS]),
  makeExpressAdapter(taskControllers.updateTaskController)
)

taskRouter.delete('/tasks/:sid',
  middlewares.checkPermissionsMiddleware([Permissions.DELETE_TASKS]),
  makeExpressAdapter(taskControllers.deleteTaskController)
)


export default taskRouter