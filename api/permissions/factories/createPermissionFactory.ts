import { Request } from 'express'
import CreatePermissionInputData from '@permissions/application/dtos/createPermissionInputData'

export default class CreatePermissionFactory {
  static fromRequest(request: Request) {
    const { name } = request.body
    const { description } = request.body

    return new CreatePermissionInputData(name, description)
  }
}
