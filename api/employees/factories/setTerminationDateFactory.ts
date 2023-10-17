import SetTerminationDateInputData from '@employees/application/dtos/setTerminationDateInputData'
import { Request } from 'express'

export default class SetTerminationDateFactory {
  static fromRequest(request: Request) {
    const { employeeId } = request.params
    const valueOfRequest =
      request.body.termination_date === 'null'
        ? null
        : request.body.termination_date
    return new SetTerminationDateInputData(Number(employeeId), valueOfRequest)
  }
}
