import PrismaConnection from '@prisma/prismaConnection'

export default class UsersModel {
  private PrismaConnection = PrismaConnection

  async findUser(userEmail: string) {
    return await this.PrismaConnection.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        email: true,
        password: true,
        employee: {
          select: {
            people: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
  }
}
