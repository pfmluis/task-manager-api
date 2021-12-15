import { v4 } from 'uuid'
import faker from 'faker'

export const makeUserStub = (user) => {
  let sid = v4()
  return {
    getSid: () => sid,
    getName: () => faker.name.findName(),
    getEmail: () => faker.internet.email(),
    getRole: () => faker.name.jobType(),
    getHash: () => faker.lorem.text(),
    getPermissions: () => ['READ', 'WRITE'],
    getCreatedAt: () => faker.date.past(),
    getUpdatedAt: () => faker.date.recent()
  }
}