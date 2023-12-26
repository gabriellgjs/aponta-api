import CreateAppointmentInputData from '@appointments/apllication/dtos/createAppointmentInputData'
import AppointmentRepository from '@appointments/infra/repositories/appointmentRepository'
import Appointment from '@appointments/domain/entities/appointment'

export default class CreateAppointmentAction {
  async execute(input: CreateAppointmentInputData) {
    const appointmentRepository = new AppointmentRepository()

    const appointment = new Appointment({
      dataTimeStart: input.dataTimeStart,
      dataTimeEnd: input.dataTimeEnd,
      patientId: input.patientId,
      dentistId: input.dentistId,
    })

    console.log(appointment)
    return await appointmentRepository.save(appointment)
  }
}
