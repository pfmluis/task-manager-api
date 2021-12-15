import faker from 'faker'

export default function makeFakeUpdateTask(overrides) {
  const task = {
    executedAt: faker.date.recent(),
    summary: faker.lorem.paragraphs(),
  }

  return {
    ...task,
    ...overrides
  }
}