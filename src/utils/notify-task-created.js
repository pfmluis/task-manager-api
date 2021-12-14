export default function makeNotifyTaskCreated({ channel }) {
  return (task) => {
    const queueName = process.env.AMQP_NOTIFY_MANAGERS_QUEUE
    const message = `The tech ${task.executedBy} performed the task ${task.sid} on the date ${task.executedAt}`

    console.log(message);
    return channel.sendToQueue(queueName, { message });
  }
}
