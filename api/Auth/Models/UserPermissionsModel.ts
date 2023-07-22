import { prismaConnection } from '@prisma/PrismaConnection';

type UserPermissionsRequest = {
  user_id: number | string;
  permissionsIds: number[];
}

export default class UserPermissionsModel {
  private prismaConnection = prismaConnection;

  async saveUserPermissions({user_id, permissionsIds} : UserPermissionsRequest) {
      const permissions = await this.prismaConnection.permissions.findMany({
        where: {
          id: {
            in: permissionsIds,
          }
        },
      });
  
      const userPermissions = permissions.map((permission) => {
        return {
          user_id : Number(user_id),
          permission_id: permission.id,
        }
      })

      await this.prismaConnection.userPermissions.createMany({
        data: userPermissions,
      });
  } 
}
