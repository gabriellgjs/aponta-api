import { BaseExceptionHandler } from './base/baseExceptionHandler'

export class UnauthorizedException extends BaseExceptionHandler {
  constructor(errorStatus: string | number, errorMessage: string | undefined) {
    super(errorStatus, errorMessage ?? '')
  }
}
