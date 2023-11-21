import ChangePasswordInputData from '@employees/application/dtos/changePasswordInputData'
import { Request } from 'express'

export default class ChangePasswordFactory {
  static fromRequest(request: Request) {
    const { id } = request.params
    const { newPassword } = request.body

    return new ChangePasswordInputData(Number(id), newPassword)
  }
}
