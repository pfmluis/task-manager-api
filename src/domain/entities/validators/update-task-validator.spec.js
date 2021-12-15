import makeFakeUpdateTask from '../../../../__test__/mocks/entities/create-task';
import updateTaskValidator from './update-task-validator';

const sut = updateTaskValidator


describe('updateTaskValidator', () => {
  
  it('should return invalid if an extra value is provided', () => {
    const task = makeFakeUpdateTask({ unknownField: 'invalid' })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if executedAt is undefined', () => {
    const task = makeFakeUpdateTask({ executedAt: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if executedAt is not a date', () => {
    const task = makeFakeUpdateTask({ executedAt: 'invalid' })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if summary is undefined', () => {
    const task = makeFakeUpdateTask({ summary: undefined })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should return invalid if summary is empty', () => {
    const task = makeFakeUpdateTask({ summary: '' })
    const result = sut(task)
    expect(result.isValid).toBe(false)
  })

  it('should return valid if valid data is provided', () => {
    const task = makeFakeUpdateTask()
    const result = sut(task)

    expect(result.isValid).toBe(true)
  })
})