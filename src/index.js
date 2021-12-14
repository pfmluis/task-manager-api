import taskService from './domain/use-cases/tasks';

taskService.deleteTask('44dff2fb-8e22-468c-ba1a-668f0f06b16e').then(console.log).catch(console.error)