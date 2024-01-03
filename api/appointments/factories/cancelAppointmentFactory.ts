import { Request } from 'express'
import CancelAppointmentInputData from '@appointments/apllication/dtos/cancelAppointmentInputData'

export default class CancelAppointmentFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    return new CancelAppointmentInputData(Number(id))
  }
}
