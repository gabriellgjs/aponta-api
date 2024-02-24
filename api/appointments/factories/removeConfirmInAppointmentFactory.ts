import { Request } from 'express'
import RemoveConfirmedAppointmentInputData from '@src/appointments/apllication/dtos/removeConfirmedAppointmentInputData'

export default class RemoveConfirmInAppointmentFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    return new RemoveConfirmedAppointmentInputData(Number(id))
  }
}
