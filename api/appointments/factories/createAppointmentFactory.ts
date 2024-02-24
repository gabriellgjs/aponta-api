import { Request } from 'express'
import CreateAppointmentInputData from '@appointments/apllication/dtos/createAppointmentInputData'

export default class CreateAppointmentFactory {
  static fromRequest(request: Request) {
    const { dataTimeStart, dataTimeEnd, dentistId, patientId, description } = request.body

    return new CreateAppointmentInputData(
      dataTimeStart,
      dataTimeEnd,
      dentistId,
      patientId,
      description
    )
  }
}
