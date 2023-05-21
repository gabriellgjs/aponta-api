import PrismaConnection  from "@prisma/PrismaConnection";

export default class RolesModel {
  private prismaConnection: PrismaConnection;

  constructor() {
    this.prismaConnection = new PrismaConnection();
  }

  async getRoles() {
    try {
      return await this.prismaConnection.role.findMany();
    } catch (error) {
      throw new Error("erro");
    }
  }

  async getRoleById(role_id: number) {
    try {
      return await this.prismaConnection.role.findUnique({
        where: {
          id: role_id,
        }
      });
    } catch (error) {
      throw new Error("erro");
    }
  }
}