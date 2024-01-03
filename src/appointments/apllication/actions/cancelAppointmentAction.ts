import AppointmentRepository from '@appointments/infra/repositories/appointmentRepository'
import DeleteAppointmentInputData from '@appointments/apllication/dtos/deleteAppointmentInputData'

export default class CancelAppointmentAction {
  async execute(input: DeleteAppointmentInputData) {
    const appointmentRepository = new AppointmentRepository()

    return await appointmentRepository.cancel(input.appointmentId)
  }
}
