import { Request } from 'express'
import UpdateDescriptionInAppointmentInputData from '@appointments/apllication/dtos/updateDescriptionInAppointmentInputData'

export default class UpdateDescriptionInAppointmentFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    const { description } = request.body

    return new UpdateDescriptionInAppointmentInputData(Number(id), description)
  }
}
