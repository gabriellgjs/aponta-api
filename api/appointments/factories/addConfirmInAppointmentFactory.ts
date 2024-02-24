import { Request } from 'express'
import AddConfirmedAppointmentInputData from '@src/appointments/apllication/dtos/addConfirmedAppointmentInputData'

export default class AddConfirmInAppointmentFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    return new AddConfirmedAppointmentInputData(Number(id))
  }
}
