import makeFakeUserFromToken from '../../../../__test__/mocks/entities/user-from-token'
import userFromTokenValidator from './user-from-token-validator'

const sut = userFromTokenValidator

describe('userFromTokenValidator', () => {
  
  it('should return invalid if sid is undefined', () => {
    const user = makeFakeUserFromToken({ sid: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if role is undefined', () => {
    const user = makeFakeUserFromToken({ role: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should allow undefined permissions', () => {
    const user = makeFakeUserFromToken({ permissions: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if sid is invalid', () => {
    const user = makeFakeUserFromToken({ sid: 'invalid' })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should return valid object if valid data is provided', () => {
    const user = makeFakeUserFromToken()
    const result = sut(user)
    expect(result.isValid).toBe(true)
  })
})