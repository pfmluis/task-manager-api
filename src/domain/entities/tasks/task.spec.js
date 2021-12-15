import entities from '..'
import makeFakeTask from '../../../../__test__/mocks/entities/task'

const sut = entities.makeTask

describe('maketask', () => {
  
  it('should generate a sid if none is provided', () => {
    const task = makeFakeTask({ sid: undefined })
    const newTask = sut(task)
    expect(newTask.getSid()).toBeDefined()
  })

  it('should default executedAt to date if it is undefined', () => {
    const task = makeFakeTask({ executedAt: undefined })
    const newTask = sut(task)

    expect(newTask).toBeDefined()
  })

  it('should throw if executedAt is not a date', () => {
    const task = makeFakeTask({ executedAt: 'invalid' })
    expect(() => sut(task)).toThrow(`ValidationError: \"executedAt\" must be a valid date`)
  })

  it('should throw if summary is undefined', () => {
    const task = makeFakeTask({ summary: undefined })
    expect(() => sut(task)).toThrow(`ValidationError: \"summary\" is required`)
  })

  it('should throw if summary is empty', () => {
    const task = makeFakeTask({ summary: '' })
    expect(() => sut(task)).toThrow(`ValidationError: \"summary\" is not allowed to be empty`)
  })

  it('should allow executedBy to be undefined', () => {
    const task = makeFakeTask({ executedBy: undefined })
    expect(() => sut(task)).toThrow(`ValidationError: \"executedBy\" is required`)
  })

  it('should throw if executedBy is invalid', () => {
    const task = makeFakeTask({ executedBy: 'invalid' })
    expect(() => sut(task)).toThrow(`ValidationError: \"executedBy\" must be a valid GUID`)
  })

  it('should allow createdAt to be undefined', () => {
    const task = makeFakeTask({ createdAt: undefined })
    expect(() => sut(task)).not.toThrow()

    const newTask = sut(task)
    expect(newTask.getCreatedAt()).toBeDefined()
  })

  it('should allow updatedAt to be undefined', () => {
    const task = makeFakeTask({ updatedAt: undefined })
    expect(() => sut(task)).not.toThrow()

    const newTask = sut(task)
    expect(newTask.getUpdatedAt()).toBeDefined()
  })

  it('should return valid object if valid data is provided', () => {
    const task = makeFakeTask()
    const newTask = sut(task)

    expect(newTask.getSid()).toBe(task.sid)
    expect(newTask.getSummary()).toBe(task.summary)
    expect(newTask.getExecutedBy()).toBe(task.executedBy)
    expect(newTask.getCreatedAt()).toBe(task.createdAt)
    expect(newTask.getUpdatedAt()).toBe(task.updatedAt)
  })
})