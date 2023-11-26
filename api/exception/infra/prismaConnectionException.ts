import { BaseExceptionHandler } from './base/baseExceptionHandler'

export class PrismaConnectionException extends BaseExceptionHandler {
  constructor(errorStatus: string | number, errorMessage: string) {
    super(errorStatus, errorMessage)
  }
}
