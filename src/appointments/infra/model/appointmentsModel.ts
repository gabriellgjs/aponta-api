import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'
import Appointment from '@appointments/domain/entities/appointment'
import dayjs from 'dayjs'

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

  async deleteAppointment(appointmentId: number) {
    try {
      return await this.PrismaConnection.appointments.delete({
        where: {
          id: appointmentId,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao deletar o agendamento')
    }
  }

  async cancelAppointment(appointmentId: number) {
    try {
      return await this.PrismaConnection.appointments.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: 'Cancelado',
          canceledAt: dayjs().format(),
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
