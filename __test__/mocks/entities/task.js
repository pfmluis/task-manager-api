import faker from 'faker'
import { v4 } from 'uuid'

export default function makeFakeTask(overrides) {
  const task = {
    sid: v4(),
    executedAt: faker.date.recent(),
    summary: faker.lorem.paragraphs(),
    executedBy: v4(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }

  return {
    ...task,
    ...overrides
  }
}