import faker from 'faker'
import { v4 } from 'uuid'

export default function makeFakeUserFromToken(overrides) {
  const user = {
    sid: v4(),
    role: faker.name.jobType(),
    permissions: ['READ', 'WRITE']
  }

  return {
    ...user,
    ...overrides
  }
}