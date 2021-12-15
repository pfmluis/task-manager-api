import faker from 'faker'

export const encryptorSub = {
  encrypt: () => ({ iv: '123123123123', content: 'asdasdasdasasdasdasdasd'}),
  decrypt: () => faker.lorem.text()
}