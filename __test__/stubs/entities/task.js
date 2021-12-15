import faker from 'faker'
import { v4 } from 'uuid'

export const makeTaskStub = (task) => {
  return {
    getSid: () => v4(),
    getExecutedAt: () => faker.date.recent(),
    getSummary: () => faker.lorem.paragraphs(),
    setSummary: (newSummary) => {},
    getExecutedBy: () => v4(),
    getCreatedAt: () => faker.date.past(),
    getUpdatedAt: () => faker.date.recent(),
  }
}
