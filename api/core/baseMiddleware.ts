import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import Sentry from '../application/sentry'
import { Response } from 'express'

export class BaseMiddleware {
  static async checkConnection(error: unknown, response?: Response) {
    if (error instanceof PrismaClientInitializationError) {
      console.error(error)
      await Sentry.sendError(
        'Prisma Connection',
        'Conexão instável com o banco de dados',
      )
      if (response) {
        return response
          .status(500)
          .json({ status: 500, message: 'Internal Server Error' })
          .end()
      }
    }
  }
}
