import PrismaConnection from '@prisma/prismaConnection'
import Role from '@roles/domain/entities/role'
import { InternalServerError } from '@apiErrors/errors'

export default class RolesModel {
  private PrismaConnection = PrismaConnection

  async createRole(role: Role) {
    try {
      return await this.PrismaConnection.role.create({
        data: {
          name: role.name,
          description: role.description,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao criar um cargo.')
    }
  }

  async deleteRole(roleId: number) {
    try {
      return await this.PrismaConnection.role.delete({
        where: {
          id: roleId,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao deletar um cargo.')
    }
  }

  async updateRole(role: Role) {
    try {
      return await this.PrismaConnection.role.update({
        where: {
          id: role.id,
        },
        data: {
          name: role.name,
          description: role.description,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar um cargo.')
    }
  }
}
