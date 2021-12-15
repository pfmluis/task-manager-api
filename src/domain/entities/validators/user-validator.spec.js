import makeUser from '../../../../__test__/mocks/entities/user'
import userValidator from './user-validator'

const sut = userValidator

describe('makeUser', () => {

  it('should generate a sid if none is provided', () => {
    const user = makeUser({ sid: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if email is undefined', () => {
    const user = makeUser({ email: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if email is invalid', () => {
    const user = makeUser({ email: 'invalid' })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if name is invalid', () => {
    const user = makeUser({ name: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if name is longer than 30 characters', () => {
    const user = makeUser({ name: 'Some very very very very very very long name' })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should allow hash to be undefined', () => {
    const user = makeUser({ hash: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(true)
  })

  it('should return invalid if permissions is not an array', () => {
    const user = makeUser({ permissions: 'SINGLE.PERMISSION' })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should allow permissions to be undefined', () => {
    const user = makeUser({ permissions: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should return valid object if valid data is provided', () => {
    const user = makeUser()
    const result = sut(user)

    expect(result.isValid).toBe(true)
  })
})