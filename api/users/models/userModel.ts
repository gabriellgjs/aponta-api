import { InternalServerError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'

export default class UsersModel {
  private prismaConnection = PrismaConnection

  async getUsers() {
    try {
      return await this.prismaConnection.user.findMany({
        where: {
          status: 'ativo',
        },
        select: {
          id: true,
          email: true,
          roleId: true,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar os usuários.')
    }
  }

  async getUserById(userId: number) {
    try {
      return await this.prismaConnection.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          employees: {
            select: {
              people: {
                select: {
                  name: true,
                },
              },
            },
          },
          id: true,
          email: true,
          roleId: true,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar o usuário.')
    }
  }
}
