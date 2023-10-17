import VerifyId from '@sharedAPI/middlewares/verifyId'
import verifyEmployeeExist from './verifyEmployeeExist'

export default async function VerifyInAndEmployeeExist(employeeId: number) {
  VerifyId(employeeId)
  await verifyEmployeeExist(Number(employeeId))
}
