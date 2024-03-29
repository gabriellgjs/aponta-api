import { Request } from 'express'
import CreateRoleInputData from '@roles/application/dtos/createRoleInputData'

export default class CreateRoleFactory {
  static fromRequest(request: Request) {
    const { name } = request.body

    return new CreateRoleInputData(name)
  }
}
