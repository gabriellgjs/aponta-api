import PrismaConnection from '@prisma/PrismaConnection';
import User from '@src/User/Domain/Entities/User';

export default class UsersModel {
  private prismaConnection: PrismaConnection;

  constructor() {
    this.prismaConnection = new PrismaConnection();
  }

  async createUser(user: User) {
    try {
      return await this.prismaConnection.user.create({
        data: {
          status: user.status,
          email: user.email,
          password: user.password,
        },
      });
    } catch (error) {
      throw new Error('erro');
    }
  }

  async deleteUser(user_id: number) {
  /*  try {
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
    }*/
  }

  async updateUser(user: User) {
  /*  try {
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
    }*/
  }
}