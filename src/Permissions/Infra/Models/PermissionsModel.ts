import { prismaConnection } from '@prisma/PrismaConnection';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';
import Permission from '../../Domain/Entities/Permission';

export default class PermissionsModel {
  private prismaConnection = prismaConnection;

  async createPermission(permission: Permission) {
    try {
      return await this.prismaConnection.permissions.create({
        data: {
          name: permission.name,
          description: permission.description,
        },
      });
    } catch (error) {
      throw new InternalServerError('Erro ao criar uma permissão.');
    }
  }

  async deletePermission(permissionId: number) {
    try {
      return await this.prismaConnection.permissions.delete({
        where: { 
          id: permissionId,
        }});
    } catch (error) {
      throw new InternalServerError('Erro ao deletar uma permissão.');
    }
  }

  async updatePermission(permission: Permission) {
    try {
      return await this.prismaConnection.permissions.update({
        where: {
          id: permission.id,
        },
        data: {
          name: permission.name,
          description: permission.description,
        },
      });
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar uma permissão.');
    }
  }
}
