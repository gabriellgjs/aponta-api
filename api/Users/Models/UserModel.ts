import { prismaConnection } from '@prisma/PrismaConnection';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

export default class UsersModel {
  private prismaConnection = prismaConnection;

  async getUsers() {
    try {
      return await this.prismaConnection.user.findMany({
        where: {
          status: 'ativo',
        },
        select: {
          id: true,
          email: true,
          role_id: true,
        },
      });
    } catch (error) {
      throw new InternalServerError("Erro ao listar os usuários.");
    }
  }

  async getUserById(user_id: number) {
    try {
      return await this.prismaConnection.user.findUnique({
        where: {
          id: user_id,
        },
        select: {
          employees: {
            select: {
              people: {
                select: {
                  name: true,
                }
              }
            }
          },
          id: true,
          email: true,
          role_id: true,
        }
      });
    } catch (error) {
      throw new InternalServerError("Erro ao listar o usuário.");
    }
  }
}
