import { Request } from 'express'
import RescheduleAppointmentInputData from '@appointments/apllication/dtos/rescheduleAppointmentInputData'

export default class RescheduleAppointmentFactory {
  static fromRequest(request: Request) {
    const { dataTimeStart, dataTimeEnd } = request.body

    const { id } = request.params

    return new RescheduleAppointmentInputData(
      dataTimeStart,
      dataTimeEnd,
      Number(id),
    )
  }
}
