import { prismaConnection } from '@prisma/PrismaConnection';

export default class UsersModel {
  private prismaConnection = prismaConnection;

  async findUser(user_email: string) {
    return await this.prismaConnection.user.findFirst({
      where: {
        email: user_email,
      },
    });
  }
}
