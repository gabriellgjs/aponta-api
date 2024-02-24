import AppointmentRepository from '@appointments/infra/repositories/appointmentRepository'
import AddConfirmedAppointmentInputData from '@appointments/apllication/dtos/addConfirmedAppointmentInputData'

export default class AddConfirmedAction {
  async execute(input: AddConfirmedAppointmentInputData) {
    const appointmentRepository = new AppointmentRepository()

    return await appointmentRepository.addConfirm(input.appointmentId)
  }
}
