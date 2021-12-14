export class ForbiddenException extends Error {

  constructor(message) {
    super(message)
    this.name = 'ForbiddenException'
    this.statusCode = 403
  }
}