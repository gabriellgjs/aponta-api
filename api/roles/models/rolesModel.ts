import { InternalServerError } from '@apiErrors/errors'
import prismaConnection from '@prisma/prismaConnection'

export default class RolesModel {
  private prismaConnection = prismaConnection

  async getRoles() {
    try {
      return await this.prismaConnection.role.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar os cargos.')
    }
  }

  async getRole(roleId: number) {
    try {
      return await this.prismaConnection.role.findUnique({
        where: {
          id: roleId,
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar o cargo.')
    }
  }
}
