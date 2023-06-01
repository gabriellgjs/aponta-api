import PrismaConnection from '@prisma/PrismaConnection';
import Role from '../../Domain/Entities/Role';

export default class RolesModel {
  private prismaConnection: PrismaConnection;

  constructor() {
    this.prismaConnection = new PrismaConnection();
  }

  async createRole(role: Role) {
    try {
      return await this.prismaConnection.role.create({
        data: {
          status: role.status,
          name: role.name,
        },
      });
    } catch (error) {
      throw new Error('erro');
    }
  }

  async deleteRole(role_id: number) {
    try {
      return await this.prismaConnection.role.update({
        where: {
          id: role_id,
        },
        data: {
          status: 'inativo',
        },
      });
    } catch (error) {
      throw new Error('erro');
    }
  }

  async updateRole(role: Role) {
    try {
      return await this.prismaConnection.role.update({
        where: {
          id: role.id,
        },
        data: {
          status: role.status,
          name: role.name,
        },
      });
    } catch (error) {
      throw new Error('erro');
    }
  }
}

//TODO tratar erros
