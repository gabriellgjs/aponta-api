import AppointmentRepository from '@appointments/infra/repositories/appointmentRepository'
import UpdatePatientInAppointmentInputData from '@appointments/apllication/dtos/updatePatientInAppointmentInputData'

export default class UpdatePatientInAppointmentAction {
  async execute(
    input: UpdatePatientInAppointmentInputData,
    actual: UpdatePatientInAppointmentInputData,
  ) {
    const appointmentRepository = new AppointmentRepository()

    return await appointmentRepository.updatePatient(actual.id, input.patientId)
  }
}
