import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'
import Appointment from '@appointments/domain/entities/appointment'

export default class AppointmentsModel {
  private PrismaConnection = PrismaConnection

  async createAppointment(appointment: Appointment) {
    try {
      return await this.PrismaConnection.appointments.create({
        data: {
          status: appointment.status,
          dataTimeStart: appointment.dataTimeStart,
          dataTimeEnd: appointment.dataTimeEnd,
          dentistId: appointment.dentistId,
          patientId: appointment.patientId,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao criar um agendamento')
    }
  }

  async deleteAppointments(appointmentId: number) {
    try {
      return await this.PrismaConnection.role.delete({
        where: {
          id: appointmentId,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao deletar o agendamento')
    }
  }

  async updateAppointments(appointment: Appointment) {
    try {
      return await this.PrismaConnection.role.update({
        where: {
          id: appointment.id,
        },
        data: {
          name: appointment.status,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar o agendamento')
    }
  }
}
