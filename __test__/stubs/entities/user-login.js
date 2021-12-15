import faker from 'faker'

export const makeUserLoginStub = (user) => {
  return {
    getEmail: () => faker.internet.email(),
    getPassword: () => faker.internet.password(),
  }
}