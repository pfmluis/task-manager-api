import entities from '../'
import makeFakeUserFromToken from '../../../../__test__/mocks/entities/user-from-token'

const sut = entities.makeUserFromToken

describe('makeUserFromToken', () => {
  
  it('should throw if sid is undefined', () => {
    const user = makeFakeUserFromToken({ sid: undefined })
    expect(() => sut(user)).toThrow(`ValidationError: \"sid\" is required`)
  })

  it('should throw if role is undefined', () => {
    const user = makeFakeUserFromToken({ role: undefined })
    expect(() => sut(user)).toThrow(`ValidationError: \"role\" is required`)
  })

  it('should allow undefined permissions', () => {
    const user = makeFakeUserFromToken({ permissions: undefined })
    expect(() => sut(user)).not.toThrow()
    const newUser = sut(user)
    expect(newUser.getPermissions()).toMatchObject([])
  })

  it('should throw if sid is invalid', () => {
    const user = makeFakeUserFromToken({ sid: 'invalid' })
    expect(() => sut(user)).toThrow(`ValidationError: \"sid\" must be a valid GUID`)
  })

  it('should return valid object if valid data is provided', () => {
    const user = makeFakeUserFromToken()
    const newUser = sut(user)

    expect(newUser.getSid()).toBe(user.sid)
    expect(newUser.getRole()).toBe(user.role)
    expect(newUser.getPermissions()).toMatchObject(user.permissions)
  })
})