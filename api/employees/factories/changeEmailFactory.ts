import ChangeEmailInputData from '@employees/application/dtos/changeEmailInputData'
import { Request } from 'express'

export default class ChangeEmailFactory {
  static fromRequest(request: Request) {
    const { id } = request.params
    const { email } = request.body

    return new ChangeEmailInputData(Number(id), email)
  }
}
