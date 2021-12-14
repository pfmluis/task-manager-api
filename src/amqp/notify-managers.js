export default function makeNotifyManagers() {
  let connection
  const queueName = process.env.AMQP_NOTIFY_MANAGERS_QUEUE

  function publish(notificationString) {
    if (!connection) throw new Error('No connection defined')

    channel.sendToQueue(queueName, Buffer.from(notificationString));

  }

  return Object.freeze({
    publish,
    setConnection: (connection) => { connection = connection }
  })

}