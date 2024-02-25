import { InternalServerError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'

export default class RolesModel {
  private PrismaConnection = PrismaConnection

  async getRoles() {
    try {
      return await this.PrismaConnection.role.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc'
        }
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar os cargos')
    }
  }

  async getRole(roleId: number) {
    try {
      return await this.PrismaConnection.role.findUnique({
        where: {
          id: roleId,
        },
        select: {
          id: true,
          name: true,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar o cargo')
    }
  }
}
