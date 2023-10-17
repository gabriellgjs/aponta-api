import { InternalServerError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'

export default class PermissionsModel {
  private PrismaConnection = PrismaConnection

  async getPermissions() {
    try {
      return await this.PrismaConnection.permissions.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar as permissões.')
    }
  }

  async getPermission(permissionId: number) {
    try {
      return await this.PrismaConnection.permissions.findUnique({
        where: {
          id: permissionId,
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar a permissão.')
    }
  }
}
