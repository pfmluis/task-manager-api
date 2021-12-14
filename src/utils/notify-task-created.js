export default function notifyTaskCreated(task) {
  console.log(`The tech ${task.executedBy} performed the task ${task.sid} on the date ${task.executedAt}`);
}