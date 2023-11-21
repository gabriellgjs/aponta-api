import PrismaConnection from '@prisma/prismaConnection'

interface RolePermissionsRequest {
  roleId: number | string
  permissionsIds: number[]
}

export default class RolePermissionsModel {
  private PrismaConnection = PrismaConnection

  async saveRolePermissions({
    roleId,
    permissionsIds,
  }: RolePermissionsRequest) {
    const permissions = await this.PrismaConnection.permissions.findMany({
      where: {
        id: {
          in: permissionsIds,
        },
      },
    })

    const rolePermissions = permissions.map((permission: { id: number }) => {
      return {
        roleId: Number(roleId),
        permissionId: permission.id,
      }
    })

    await this.PrismaConnection.rolePermissions.createMany({
      data: rolePermissions,
    })
  }
}
