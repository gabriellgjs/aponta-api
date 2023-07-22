import { prismaConnection } from '@prisma/PrismaConnection';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

export default class PermissionsModel {
  private prismaConnection = prismaConnection;

  async getPermissions() {
    try {
      return await this.prismaConnection.permissions.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    } catch (error) {
      throw new InternalServerError("Erro ao listar as permissões.");
    }
  }

  async getPermission(permission_id: number) {
    try {
      return await this.prismaConnection.permissions.findUnique({
        where: {
          id: permission_id,
        },
        select: {
          id: true,
          name: true,
          description: true,
        }
      });
    } catch (error) {
      throw new InternalServerError("Erro ao listar a permissão.");
    }
  }
}
