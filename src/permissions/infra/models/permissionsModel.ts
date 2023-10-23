import PrismaConnection from '@prisma/prismaConnection'
import Permission from '@permissions/domain/entities/permission'
import { InternalServerError } from '@apiErrors/errors'

export default class PermissionsModel {
  private PrismaConnection = PrismaConnection

  async createPermission(permission: Permission) {
    try {
      return await this.PrismaConnection.permissions.create({
        data: {
          name: permission.name,
          description: permission.description,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao criar uma permissão.')
    }
  }

  async deletePermission(permissionId: number) {
    try {
      return await this.PrismaConnection.permissions.delete({
        where: {
          id: permissionId,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao deletar uma permissão.')
    }
  }

  async updatePermission(permission: Permission) {
    try {
      return await this.PrismaConnection.permissions.update({
        where: {
          id: permission.id,
        },
        data: {
          name: permission.name,
          description: permission.description,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar uma permissão.')
    }
  }
}
