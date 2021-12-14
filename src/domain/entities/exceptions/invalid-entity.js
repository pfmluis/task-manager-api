export class InvalidEntityException extends Error {

  constructor(message) {
    super(message)
    this.name = 'InvalidEntityException'
    this.statusCode = 400
  }
}