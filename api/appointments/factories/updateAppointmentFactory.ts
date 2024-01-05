import { Request } from 'express'
import UpdatePatientInAppointmentInputData from '@appointments/apllication/dtos/updatePatientInAppointmentInputData'

export default class UpdatePatientInAppointmentFactory {
  static fromRequest(request: Request) {
    const { id } = request.params

    const { patientId } = request.body

    return new UpdatePatientInAppointmentInputData(Number(id), patientId)
  }

  static fromCurrentAppointment(appointment: any) {
    return new UpdatePatientInAppointmentInputData(
      appointment.id,
      appointment.patientId,
    )
  }
}
