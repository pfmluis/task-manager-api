import faker from 'faker'
import { v4 } from 'uuid'

export default function makeFakeUserLogin(overrides) {
  const user = {
    sid: v4(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    hash: faker.lorem.paragraph(),
    role: faker.name.jobType(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    permissions: ['READ', 'WRITE']
  }

  return {
    ...user,
    ...overrides
  }
}