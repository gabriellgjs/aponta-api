import { prismaConnection } from '@prisma/PrismaConnection';

type RolePermissionsRequest = {
  role_id: number | string;
  permissionsIds: number[];
}

export default class RolePermissionsModel {
  private prismaConnection = prismaConnection;

  async saveRolePermissions({role_id, permissionsIds} : RolePermissionsRequest) {
      const permissions = await this.prismaConnection.permissions.findMany({
        where: {
          id: {
            in: permissionsIds,
          }
        },
      });
  
      const rolePermissions = permissions.map((permission) => {
        return {
          role_id : Number(role_id),
          permission_id: permission.id,
        }
      })

      await this.prismaConnection.rolePermissions.createMany({
        data: rolePermissions,
      });
  } 
}
