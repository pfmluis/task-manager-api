import faker from 'faker'

export const roleDbStub = {
  findOneByName: () => {
    return {
      name: faker.name.jobType(),
    }
  }
}