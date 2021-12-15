import faker from 'faker'
import { v4 } from 'uuid'

export const userDbStub = {
  findByEmail: (email) => {
    return {
      sid: v4(),
      email,
      hash: v4(),
      role: faker.name.jobType()
    }
  },
  createUser: () => {
    return {
      sid: v4(),
      email: faker.internet.email(),
      hash: v4(),
      role: faker.name.jobType()
    }
  },
  findByEmailWithRoleAndPermissions: () => {
    return {
      sid: v4(),
      email: faker.internet.email(),
      hash: v4(),
      role: faker.name.jobType()
    }
  }
}
