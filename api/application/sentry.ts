import * as sentry from '@sentry/node'

sentry.init({
  dsn: 'https://0e7a97e57560db6e43aadbb6d67258f4@o4506213216157696.ingest.sentry.io/4506213218189312',
})

export default class Sentry {
  static requestHandler() {
    return sentry.Handlers.requestHandler()
  }

  static errorHandler() {
    return sentry.Handlers.errorHandler()
  }

  static async sendError(nameStatus: string | number, error: string) {
    sentry.captureException(
      `${String(nameStatus)}\nMensagem do erro: ${error} `,
    )
  }
}
