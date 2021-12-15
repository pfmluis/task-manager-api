import faker from 'faker'

export const passwordHashStub = {
  encrypt: () => faker.lorem.text(),
  compare: () => true
}