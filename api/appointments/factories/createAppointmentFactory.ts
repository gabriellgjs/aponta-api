import { Request } from 'express'
import CreateAppointmentInputData from '@appointments/apllication/dtos/createAppointmentInputData'
import dayjs from 'dayjs'

export default class CreateAppointmentFactory {
  static fromRequest(request: Request) {
    const { dataTimeStart, dataTimeEnd, userId, dentistId, patientId } =
      request.body

    console.log(dayjs(dataTimeEnd).toString())
    return new CreateAppointmentInputData(
      dataTimeStart,
      dataTimeEnd,
      userId,
      dentistId,
      patientId,
    )
  }
}
