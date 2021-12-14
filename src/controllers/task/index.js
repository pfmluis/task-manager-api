import makeCreateTaskController from './create-task-controller'
import taskService from '../../domain/use-cases/tasks'
import makeUpdateTask from '../../domain/use-cases/tasks/update-task'
import makeDeleteTaskController from './delete-task-controller'
import makeFindTaskController from './find-tasks-controller'

const createTask = taskService.createTask
const updateTask = taskService.updateTask
const deleteTask = taskService.deleteTask
const findTasks = taskService.findTasks

const createTaskController = makeCreateTaskController({ createTask })
const updateTaskController = makeUpdateTask({ updateTask })
const deleteTaskController = makeDeleteTaskController({ deleteTask })
const findTasksController = makeFindTaskController({ findTasks })

const taskControllers = Object.freeze({ createTaskController, updateTaskController, deleteTaskController, findTasksController })
export default taskControllers