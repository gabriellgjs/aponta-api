import { prismaConnection } from '@prisma/PrismaConnection';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';
import Role from '../../Domain/Entities/Role';

export default class RolesModel {
  private prismaConnection = prismaConnection;

  async createRole(role: Role) {
    try {
      return await this.prismaConnection.role.create({
        data: {
          name: role.name,
          status: role.status,
        },
      });
    } catch (error) {
      throw new InternalServerError('Erro ao criar um cargo.');
    }
  }

  async deleteRole(roleId: number) {
    try {
      return await this.prismaConnection.role.updateMany({
        where: {
          id: roleId,
          status: 'ativo',
        },
        data: {
          status: 'inativo',
        },
      });
    } catch (error) {
      throw new InternalServerError('Erro ao deletar um cargo.');
    }
  }

  async updateRole(role: Role) {
    try {
      return await this.prismaConnection.role.update({
        where: {
          id: role.id,
        },
        data: {
          name: role.name,
        },
      });
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar um cargo.');
    }
  }
}
