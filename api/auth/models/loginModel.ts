import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'
import Sentry from '../../application/sentry'

export default class UsersModel {
  private PrismaConnection = PrismaConnection

  async findUser(userEmail: string) {
    try {
      const user = await this.PrismaConnection.user.findUnique({
        where: {
          email: userEmail,
        },
        select: {
          id: true,
          email: true,
          password: true,
          employee: {
            select: {
              people: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })

      if (!user) throw new InternalServerError('Erro ao realizar login')

      return user
    } catch (error) {
      if (error instanceof InternalServerError) {
        await Sentry.sendError(error.nameError, error.statusCode, error.message)
      }
    }
  }
}
