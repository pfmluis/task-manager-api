import faker from 'faker'

export default function makeFakeCreateTask(overrides) {
  const task = {
    executedAt: faker.date.recent(),
    summary: faker.lorem.paragraphs(),
  }

  return {
    ...task,
    ...overrides
  }
}