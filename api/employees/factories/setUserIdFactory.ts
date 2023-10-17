import SetUserIdInputData from '@employees/application/dtos/setUserIdInputData'
import { Request } from 'express'

export default class SetUserIdFactory {
  static fromRequest(request: Request) {
    const { employeeId } = request.params
    const { userId } = request.body

    return new SetUserIdInputData(Number(employeeId), Number(userId))
  }
}
