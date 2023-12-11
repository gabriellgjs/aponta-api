import { Request } from 'express'
import StatusPatientInputData from '@patients/application/dtos/statusPatientInputData'

export default class StatusPatientFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    return new StatusPatientInputData(Number(id))
  }
}
