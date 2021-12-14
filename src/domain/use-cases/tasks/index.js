import createTaskValidator from '../../entities/validators/create-task-validator'
import updateTaskValidator from '../../entities/validators/update-task-validator' 
import makeCreateTask from './create-task'
import encryptor from '../../../utils/encryptor'
import entities from '../../entities';
import db from '../../../data';
import makeUpdateTask from './update-task';
import makeDeleteTask from './delete-task';
import makeFindTasks from './find-tasks';
import makeNotifyTaskCreated from '../../../utils/notify-task-created';
import queues from '../../../amqp'


const makeTask = entities.makeTask
const taskDb = db.taskDb

const notifyManagersChannel = queues.notifyManagersChannel
const notifyTaskCreated = makeNotifyTaskCreated({ channel: notifyManagersChannel })

const createTask = makeCreateTask({ makeTask, createTaskValidator, encryptor, taskDb, notifyTaskCreated })
const updateTask = makeUpdateTask({ makeTask, updateTaskValidator, encryptor, taskDb })
const deleteTask = makeDeleteTask({ makeTask, taskDb })
const findTasks = makeFindTasks({ encryptor, taskDb})

const taskService = Object.freeze({ createTask, updateTask, deleteTask, findTasks })
export default taskService