import VerifyId from '@sharedAPI/middlewares/verifyId'
import verifyRoleExist from '@sharedAPI/middlewares/verifyRoleExist'

export default async function VerifyIdAndRoleExist(roleId: number) {
  VerifyId(roleId)
  await verifyRoleExist(Number(roleId))
}
