import entities from '..'
import makeUser from '../../../../__test__/mocks/entities/user'

const sut = entities.makeUser

describe('makeUser', () => {
  
  it('should generate a sid if none is provided', () => {
    const user = makeUser({ sid: undefined })
    const newUser = sut(user)
    expect(newUser.getSid()).toBeDefined()
  })

  it('should throw if email is undefined', () => {
    const user = makeUser({ email: undefined })
    expect(() => sut(user)).toThrow(`ValidationError: \"email\" is required`)
  })

  it('should throw if email is invalid', () => {
    const user = makeUser({ email: 'invalid' })
    expect(() => sut(user)).toThrow(`ValidationError: \"email\" must be a valid email`)
  })

  it('should throw if name is invalid', () => {
    const user = makeUser({ name: undefined })
    expect(() => sut(user)).toThrow(`ValidationError: \"name\" is required`)
  })

  it('should throw if name is longer than 30 characters', () => {
    const user = makeUser({ name: 'Some very very very very very very long name' })
    expect(() => sut(user)).toThrow(`ValidationError: \"name\" length must be less than or equal to 30 characters long`)
  })

  it('should allow hash to be undefined', () => {
    const user = makeUser({ hash: undefined })
    expect(() => sut(user)).not.toThrow()
  })

  it('should throw if permissions is not an array', () => {
    const user = makeUser({ permissions: 'SINGLE.PERMISSION' })
    expect(() => sut(user)).toThrow(`ValidationError: \"permissions\" must be an array`)
  })

  it('should allow permissions to be undefined', () => {
    const user = makeUser({ permissions: undefined })
    expect(() => sut(user)).not.toThrow()

    const newUser = sut(user)
    expect(newUser.getPermissions()).toMatchObject([])
  })

  it('should return valid object if valid data is provided', () => {
    const user = makeUser()
    const newUser = sut(user)

    expect(newUser.getSid()).toBe(user.sid)
    expect(newUser.getEmail()).toBe(user.email)
    expect(newUser.getName()).toBe(user.name)
    expect(newUser.getCreatedAt()).toBe(user.createdAt)
    expect(newUser.getHash()).toBe(user.hash)
    expect(newUser.getUpdatedAt()).toBe(user.updatedAt)
    expect(newUser.getPermissions()).toMatchObject(user.permissions)
  })
})