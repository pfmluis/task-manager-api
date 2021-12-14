export class NotFoundException extends Error {

  constructor(message) {
    super(message)
    this.name = 'NotFoundException'
    this.status = 404
  }
}