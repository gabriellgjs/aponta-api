import AppointmentRepository from '@appointments/infra/repositories/appointmentRepository'
import DeleteAppointmentInputData from '@appointments/apllication/dtos/deleteAppointmentInputData'

export default class DeleteAppointmentAction {
  async execute(input: DeleteAppointmentInputData) {
    const appointmentRepository = new AppointmentRepository()

    return await appointmentRepository.delete(input.appointmentId)
  }
}
