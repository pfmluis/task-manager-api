import makeFakeUserLogin from '../../../../__test__/mocks/entities/user-login'
import userLoginValidator from './user-login-validator'

const sut = userLoginValidator

describe('makeUserLogin', () => {
  
  it('should throw if email is undefined', () => {
    const user = makeFakeUserLogin({ email: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should throw if password is undefined', () => {
    const user = makeFakeUserLogin({ password: undefined })
    const result = sut(user)
    expect(result.isValid).toBe(false)
  })

  it('should return valid object if valid data is provided', () => {
    const user = makeFakeUserLogin()
    const result = sut(user)
    expect(result.isValid).toBe(true)
  })
})