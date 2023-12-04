import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import Sentry from '../application/sentry'

export class BaseModel {
  async errorPrismaConnection(error: unknown) {
    if (error instanceof PrismaClientInitializationError) {
      console.error(error)
      await Sentry.sendError(
        'Prisma Connection',
        'Conexão instável com o banco de dados',
      )
    }
  }
}
