import { prismaConnection } from '@prisma/PrismaConnection';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

export default class RolesModel {
  private prismaConnection = prismaConnection;


  async getRoles() {
    try {
      return await this.prismaConnection.role.findMany({
        where: {
          status: 'ativo',
        },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      throw new InternalServerError("Erro ao listar os cargos.");
    }
  }

  async getRole(role_id: number) {
    try {
      return await this.prismaConnection.role.findFirst({
        where: {
          id: role_id,
          status: 'ativo',
        },
        select: {
          id: true,
          name: true,
        }
      });
    } catch (error) {
      throw new InternalServerError("Erro ao listar o cargo.");
    }
  }
}
