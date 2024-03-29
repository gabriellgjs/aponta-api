import AppointmentsModel from '@appointments/infra/model/appointmentsModel'
import Appointment from '@appointments/domain/entities/appointment'

export default class AppointmentRepository {
  private appointmentsModel: AppointmentsModel

  constructor() {
    this.appointmentsModel = new AppointmentsModel()
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
    return await this.appointmentsModel.rescheduleAppointment(
      dataTimeStart,
      dataTimeEnd,
      appointmentId,
    )
  }

  async updatePatient(appointmentId: number, patientId: number): Promise<void> {
    await this.appointmentsModel.updatePatientInAppointment(
      appointmentId,
      patientId,
    )
  }

  async updateDescription(appointmentId: number, description: string) {
    await this.appointmentsModel.updateDescriptionInAppointment(appointmentId, description)
  }

  async delete(appointmentId: number): Promise<void> {
    await this.appointmentsModel.deleteAppointment(appointmentId)
  }

  async cancel(appointmentId: number): Promise<void> {
    await this.appointmentsModel.cancelAppointment(appointmentId)
  }

  async addConfirm(appointmentId: number) {
    await this.appointmentsModel.confirmedAppointment(appointmentId)
  }

  async removeConfirm(appointmentId: number) {
    await this.appointmentsModel.notConfirmedAppointment(appointmentId)
  }
}
