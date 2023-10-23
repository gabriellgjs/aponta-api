import CreateUserInputData from '@users/application/dtos/createUserInputData'
import { Request } from 'express'

export default class CreateUserFactory {
  static fromRequest(request: Request) {
    const { email } = request.body
    const { password } = request.body
    const { roleId } = request.body

    return new CreateUserInputData(email, password, roleId)
  }
}
