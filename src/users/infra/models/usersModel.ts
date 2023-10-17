import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'
import User from '@users/domain/entities/user'

export default class UsersModel {
  private PrismaConnection = PrismaConnection

  async createUser(user: User) {
    try {
      const { id } = await this.PrismaConnection.user.create({
        data: {
          status: user.status,
          email: user.email,
          password: user.password,
          roleId: user.roleId,
        },
      })

      return id
    } catch (error) {
      throw new InternalServerError('Erro ao criar o usuário')
    }
  }

  async deleteUser(userId: number) {
    /*  try {
      return await this.PrismaConnection.role.update({
        where: {
          id: role_id,
        },
        data: {
          status: 'inativo',
        },
      });
    } catch (error) {
      throw new Error('erro');
    } */
  }

  async updateUser(user: User) {
    /*  try {
      return await this.PrismaConnection.role.update({
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
    } */
  }
}
