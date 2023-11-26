import Sentry from '../../../application/sentry'

export abstract class BaseExceptionHandler {
  private readonly errorStatus: string | number
  private readonly errorMessage: string

  protected constructor(errorStatus: string | number, errorMessage: string) {
    this.errorStatus = errorStatus
    this.errorMessage = errorMessage
  }

  async sendToSentry() {
    await Sentry.sendError(this.errorStatus, this.errorMessage)

    return {
      status: Number(this.errorStatus),
      message: this.errorMessage,
    }
  }
}
