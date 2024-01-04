import AppointmentRepository from '@appointments/infra/repositories/appointmentRepository'
import RescheduleAppointmentInputData from '@appointments/apllication/dtos/rescheduleAppointmentInputData'

export default class RescheduleAppointmentAction {
  async execute(input: RescheduleAppointmentInputData) {
    const appointmentRepository = new AppointmentRepository()

    const { dataTimeStart, dataTimeEnd, appointmentId } = input
    return await appointmentRepository.reschedule(
      dataTimeStart,
      dataTimeEnd,
      appointmentId,
    )
  }
}
