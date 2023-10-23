import { Request } from 'express'
import DeleteRoleInputData from '@roles/application/dtos/deleteRoleInputData'

export default class DeleteRoleFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    return new DeleteRoleInputData(Number(id))
  }
}
