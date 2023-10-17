import PrismaConnection from '@prisma/prismaConnection'

interface UserPermissionsRequest {
  userId: number | string
  permissionsIds: number[]
}

export default class UserPermissionsModel {
  private prismaConnection = PrismaConnection

  async saveUserPermissions({
    userId,
    permissionsIds,
  }: UserPermissionsRequest) {
    const permissions = await this.prismaConnection.permissions.findMany({
      where: {
        id: {
          in: permissionsIds,
        },
      },
    })

    const userPermissions = permissions.map((permission: { id: number }) => {
      return {
        userId: Number(userId),
        permissionId: permission.id,
      }
    })

    await this.prismaConnection.userPermissions.createMany({
      data: userPermissions,
    })
  }
}
