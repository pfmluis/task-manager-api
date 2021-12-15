import makeFakeTask from '../../../../__test__/mocks/entities/task'
import taskValidator from './task-validator'

const sut = taskValidator

describe('taskValidator', () => {

  it('should return invalid if sid is undefined', () => {
    const task = makeFakeTask({ sid: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should default executedAt to date if it is undefined', () => {
    const task = makeFakeTask({ executedAt: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should throw if executedAt is not a date', () => {
    const task = makeFakeTask({ executedAt: 'invalid' })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should throw if summary is undefined', () => {
    const task = makeFakeTask({ summary: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should throw if summary is empty', () => {
    const task = makeFakeTask({ summary: '' })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should allow executedBy to be undefined', () => {
    const task = makeFakeTask({ executedBy: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should throw if executedBy is invalid', () => {
    const task = makeFakeTask({ executedBy: 'invalid' })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should allow createdAt to be undefined', () => {
    const task = makeFakeTask({ createdAt: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(true)
  })

  it('should allow updatedAt to be undefined', () => {
    const task = makeFakeTask({ updatedAt: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(true)
  })

  it('should return valid object if valid data is provided', () => {
    const task = makeFakeTask()
    const result = sut(task)
    expect(result.isValid).toBe(true)
  })
})