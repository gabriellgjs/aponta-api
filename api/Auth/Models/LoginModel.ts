import { prismaConnection } from '@prisma/PrismaConnection';

export default class UsersModel {
  private prismaConnection = prismaConnection;

  async findUser(user_email: string) {
    return await this.prismaConnection.user.findUnique({
      where: {
        email: user_email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        employees: {
          select: {
            people: {
              select: {
                name: true,
              
              }
            }
          }
        }
      }
    });
  }
}
