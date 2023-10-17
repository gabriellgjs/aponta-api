import { Request } from 'express'
import DeletePermissionInputData from '@permissions/application/dtos/deletePermissionInputData'

export default class DeletePermissionFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    return new DeletePermissionInputData(Number(id))
  }
}
