import AppointmentRepository from '@appointments/infra/repositories/appointmentRepository'
import RemoveConfirmedAppointmentInputData from '@appointments/apllication/dtos/removeConfirmedAppointmentInputData'

export default class RemoveConfirmedAction {
  async execute(input: RemoveConfirmedAppointmentInputData) {
    const appointmentRepository = new AppointmentRepository()

    return await appointmentRepository.removeConfirm(input.appointmentId)
  }
}
