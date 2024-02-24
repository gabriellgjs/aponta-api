import AppointmentRepository from '@appointments/infra/repositories/appointmentRepository'
import UpdateDescriptionInAppointmentInputData from '../dtos/updateDescriptionInAppointmentInputData'

export default class UpdateDescriptionInAppointmentAction {
  async execute(
    input: UpdateDescriptionInAppointmentInputData,
  ) {
    const appointmentRepository = new AppointmentRepository()

    return await appointmentRepository.updateDescription(input.id, input.description)
  }
}
