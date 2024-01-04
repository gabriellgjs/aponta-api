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

  async reschedule(
    dataTimeStart: string,
    dataTimeEnd: string,
    appointmentId: number,
  ) {
    const appointmentCreated =
      await this.appointmentsModel.rescheduleAppointment(
        dataTimeStart,
        dataTimeEnd,
        appointmentId,
      )

    return appointmentCreated
  }

  async update(appointment: Appointment): Promise<void> {
    await this.appointmentsModel.updateAppointments(appointment)
  }

  async delete(appointmentId: number): Promise<void> {
    await this.appointmentsModel.deleteAppointment(appointmentId)
  }

  async cancel(appointmentId: number): Promise<void> {
    await this.appointmentsModel.cancelAppointment(appointmentId)
  }
}
