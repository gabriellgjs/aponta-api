import { undefined } from 'zod'
import { ErrorsProps } from './types/errorsProps'

export class BaseError extends Error {
  public readonly statusCode: number
  public readonly paths?: (string | number)[]
  public readonly messageByPath?: string[]

  constructor(
    message: string,
    statusCode: number,
    paths?: (string | number)[] | undefined,
    messageByPath?: string[],
  ) {
    super(message)
    this.statusCode = statusCode
    this.paths = paths
    this.messageByPath = messageByPath
  }
}

export class BadRequestError extends BaseError {
  constructor({ message, paths, messageByPath }: ErrorsProps) {
    super(message, 400, paths, messageByPath)
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
