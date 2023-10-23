import StatusEmployeeInputData from '@employees/application/dtos/statusEmployeeInputData'
import { Request } from 'express'

export default class StatusEmployeeFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    return new StatusEmployeeInputData(Number(id))
  }
}
