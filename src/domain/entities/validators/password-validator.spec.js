import passwordValidator from './password-validator';

const sut = passwordValidator

describe('passwordValidator', () => {
  
  it('should return invalid if an empty value is provided', () => {
    const result = sut('')
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if the value is not longer than 8 characters', () => {
    const result = sut('pass')
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if the value does not contain a number', () => {
    const result = sut('pass@pass@pass')
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if the value does not contain a special character', () => {
    const result = sut('pass123pass123pass')
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if the value is longer than 50 characters', () => {
    const result = sut('Someveryveryveryveryveryveryveryveryveryveryveryveryveryverlongpass!213')
    expect(result.isValid).toBe(false)
  })

  it('should return valid if valid password is provided', () => {
    const result = sut('someverystrongpassword@123')

    expect(result.isValid).toBe(true)
  })
})