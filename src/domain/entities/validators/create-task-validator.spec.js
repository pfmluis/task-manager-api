import makeFakeCreateTask from '../../../../__test__/mocks/entities/create-task';
import createTaskValidator from './create-task-validator';

const sut = createTaskValidator


describe('createTaskValidator', () => {
  
  it('should return invalid if an extra value is provided', () => {
    const task = makeFakeCreateTask({ unknownField: 'invalid' })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if executedAt is undefined', () => {
    const task = makeFakeCreateTask({ executedAt: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should throw if executedAt is not a date', () => {
    const task = makeFakeCreateTask({ executedAt: 'invalid' })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should throw if summary is undefined', () => {
    const task = makeFakeCreateTask({ summary: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should throw if summary is empty', () => {
    const task = makeFakeCreateTask({ summary: '' })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should return valid if valid data is provided', () => {
    const task = makeFakeCreateTask()
    const result = sut(task)

    expect(result.isValid).toBe(true)
  })
})