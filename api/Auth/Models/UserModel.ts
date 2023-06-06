import PrismaConnection from '@prisma/PrismaConnection';

export default class UsersModel {
  private prismaConnection: PrismaConnection;

  constructor() {
    this.prismaConnection = new PrismaConnection();
  }

  async findUser(user_email: string) {
      return await this.prismaConnection.user.findFirst({
        where: {
          email: user_email,
        },
      });
  }

}