export class BaseError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401)
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404)
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(message, 500)
  }
}

export class ServiceUnavailable extends BaseError {
  constructor(message: string) {
    super(message, 503)
  }
}
