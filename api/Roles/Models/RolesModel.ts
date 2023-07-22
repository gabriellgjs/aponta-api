import { prismaConnection } from '@prisma/PrismaConnection';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

export default class RolesModel {
  private prismaConnection = prismaConnection;

  async getRoles() {
    try {
      return await this.prismaConnection.role.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    } catch (error) {
      throw new InternalServerError("Erro ao listar os cargos.");
    }
  }

  async getRole(role_id: number) {
    try {
      return await this.prismaConnection.role.findUnique({
        where: {
          id: role_id,
        },
        select: {
          id: true,
          name: true,
          description: true,
        }
      });
    } catch (error) {
      throw new InternalServerError("Erro ao listar o cargo.");
    }
  }
}
