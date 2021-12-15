import faker from 'faker'

export default function makeFakeUserLogin(overrides) {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  return {
    ...user,
    ...overrides
  }
}