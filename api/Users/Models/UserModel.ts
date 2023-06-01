import PrismaConnection from '@prisma/PrismaConnection';

export default class UsersModel {
  private prismaConnection: PrismaConnection;

  constructor() {
    this.prismaConnection = new PrismaConnection();
  }

  async getUsers() {
    try {
      return await this.prismaConnection.user.findMany({
        where: {
          status: 'ativo',
        },
        select: {
          id: true,
          email: true,
        },
      });
    } catch (error) {
      throw new Error('erro');
    }
  }

  async getUserById(user_id: number) {
    try {
      return await this.prismaConnection.user.findUnique({
        where: {
          id: user_id,
        },
      });
    } catch (error) {
      throw new Error('erro');
    }
  }
}
