import { prismaConnection } from '@prisma/PrismaConnection';
import User from '@src/User/Domain/Entities/User';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

export default class UsersModel {
  private prismaConnection = prismaConnection;

  async createUser(user: User) {
    try {
      const { id } = await this.prismaConnection.user.create({
        data: {
          status: user.status,
          email: user.email,
          password: user.password,
        },
      });
      
      return id;
    } catch (error) {
      throw new InternalServerError("Erro ao criar o usuário");
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