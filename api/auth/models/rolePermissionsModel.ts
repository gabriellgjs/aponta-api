import PrismaConnection from '@prisma/prismaConnection'

interface RolePermissionsRequest {
  roleId: number | string
  permissionsIds: number[]
}

export default class RolePermissionsModel {
  private prismaConnection = PrismaConnection

  async saveRolePermissions({
    roleId,
    permissionsIds,
  }: RolePermissionsRequest) {
    const permissions = await this.prismaConnection.permissions.findMany({
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

    await this.prismaConnection.rolePermissions.createMany({
      data: rolePermissions,
    })
  }
}

// TODO corrigir tipagem
