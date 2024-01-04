import { Request } from 'express'
import DeleteAppointmentInputData from '@appointments/apllication/dtos/deleteAppointmentInputData'

export default class DeleteAppointmentFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    return new DeleteAppointmentInputData(Number(id))
  }
}
