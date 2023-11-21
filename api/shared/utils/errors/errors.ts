export class BaseError extends Error {
  public readonly statusCode: number
  public readonly nameError: string

  constructor(message: string, statusCode: number, nameError: string) {
    super(message)
    this.statusCode = statusCode
    this.nameError = nameError
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400, 'BadRequestError')
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401, 'UnauthorizedError')
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404, 'NotFoundError')
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(message, 500, 'InternalServerError')
  }
}

export class ServiceUnavailable extends BaseError {
  constructor(message: string) {
    super(message, 503, 'ServiceUnavailable')
  }
}
