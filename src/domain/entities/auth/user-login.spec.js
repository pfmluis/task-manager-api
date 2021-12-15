import entities from '..'
import makeFakeUserLogin from '../../../../__test__/mocks/entities/user-login'

const sut = entities.makeUserLogin

describe('makeUserLogin', () => {
  
  it('should throw if email is undefined', () => {
    const user = makeFakeUserLogin({ email: undefined })
    expect(() => sut(user)).toThrow(`ValidationError: \"email\" is required`)
  })

  it('should throw if password is undefined', () => {
    const user = makeFakeUserLogin({ password: undefined })
    expect(() => sut(user)).toThrow(`ValidationError: \"password\" is required`)
  })

  it('should return valid object if valid data is provided', () => {
    const user = makeFakeUserLogin()
    const newUser = sut(user)

    expect(newUser.getEmail()).toBe(user.email)
    expect(newUser.getPassword()).toBe(user.password)
  })
})