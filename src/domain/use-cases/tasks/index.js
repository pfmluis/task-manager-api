import createTaskValidator from '../../entities/validators/create-task-validator'
import updateTaskValidator from '../../entities/validators/update-task-validator' 
import makeCreateTask from './create-task'
import encryptor from '../../../utils/encryptor'
import entities from '../../entities';
import db from '../../../data';
import notifyTaskCreated from '../../../utils/notify-task-created'
import makeUpdateTask from './update-task';
import makeDeleteTask from './delete-task';


const makeTask = entities.makeTask
const taskDb = db.taskDb

const createTask = makeCreateTask({ makeTask, createTaskValidator, encryptor, taskDb, notifyTaskCreated })
const updateTask = makeUpdateTask({ makeTask, updateTaskValidator, encryptor, taskDb })
const deleteTask = makeDeleteTask({ makeTask, taskDb })

const taskService = Object.freeze({ createTask, updateTask, deleteTask })
export default taskService