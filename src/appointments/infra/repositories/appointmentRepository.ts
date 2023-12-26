import AppointmentsModel from '@appointments/infra/model/appointmentsModel'
import Appointment from '@appointments/domain/entities/appointment'

export default class AppointmentRepository {
  private appointmentsModel: AppointmentsModel

  constructor() {
    this.appointmentsModel = new AppointmentsModel()
  }

  async save(appointment: Appointment) {
    if (appointment.id) {
      return this.update(appointment)
    }

    return this.create(appointment)
  }

  async create(appointment: Appointment): Promise<Appointment> {
    const appointmentCreated =
      await this.appointmentsModel.createAppointment(appointment)

    appointment.id = appointmentCreated?.id

    return appointment
  }

  async update(appointment: Appointment): Promise<void> {
    await this.appointmentsModel.updateAppointments(appointment)
  }

  async delete(appointmentId: number): Promise<void> {
    await this.appointmentsModel.deleteAppointments(appointmentId)
  }
}
