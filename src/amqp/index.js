import amqp from 'amqp-connection-manager'

const queueName = process.env.AMQP_NOTIFY_MANAGERS_QUEUE

const connection = amqp.connect([process.env.AMQP_CONNECTION_STING])
const notifyManagersChannel = connection.createChannel({
  json: true,
  setup: (channel) => channel.assertQueue(queueName, { durable: true })
})

const queues = Object.freeze({ notifyManagersChannel })
export default queues