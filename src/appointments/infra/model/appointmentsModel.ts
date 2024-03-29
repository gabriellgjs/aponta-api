import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'
import Appointment from '@appointments/domain/entities/appointment'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)


export default class AppointmentsModel {
  private PrismaConnection = PrismaConnection

  async createAppointment(appointment: Appointment) {
    try {
      return await this.PrismaConnection.appointments.create({
        data: {
          status: appointment.status,
          description: appointment.description ?? null,
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

  async rescheduleAppointment(
    dataTimeStart: string,
    dataTimeEnd: string,
    appointmentId: number,
  ) {
    let data
    try {
      const appointmentOriginal =
        await this.PrismaConnection.appointments.findUnique({
          where: {
            id: appointmentId,
          },
        })

      data = await this.PrismaConnection.$transaction([
        this.PrismaConnection.appointments.create({
          data: {
            status: 'Ativo',
            dataTimeStart,
            dataTimeEnd,
            description: appointmentOriginal?.description,
            dentistId: appointmentOriginal?.dentistId ?? 1,
            patientId: appointmentOriginal?.patientId ?? 1,
            appointmentId,
          },
        }),
        this.PrismaConnection.appointments.update({
          where: {
            id: appointmentId,
          },
          data: {
            status: 'Reagendado',
          },
        }),
      ])

      const appointmentRecorded =
        await this.PrismaConnection.appointments.findFirst({
          where: {
            id: data[0].id,
          },
          select: {
            id: true,
          },
        })

      return appointmentRecorded?.id
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Erro ao reagendar o agendamento')
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
      throw new InternalServerError('Erro ao cancelar o agendamento')
    }
  }

  async updatePatientInAppointment(appointmentId: number, patientId: number) {
    try {
      return await this.PrismaConnection.appointments.update({
        where: {
          id: appointmentId,
        },
        data: {
          patientId,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar um paciente em um agendamento')
    }
  }

  async updateDescriptionInAppointment(appointmentId: number, description: string) {
    try {
      return await this.PrismaConnection.appointments.update({
        where: {
          id: appointmentId,
        },
        data: {
          description,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar a descrição de um agendamento')
    }
  }

  async confirmedAppointment(appointmentId: number) {
    try {
      return await this.PrismaConnection.appointments.update({
        where: {
          id: appointmentId,
        },
        data: {
          confirmedAt: dayjs.utc(dayjs()).tz('America/Sao_Paulo').format(),
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro adicionar confirmação do agendamento')
    }
  }

  async notConfirmedAppointment(appointmentId: number) {
    try {
      return await this.PrismaConnection.appointments.update({
        where: {
          id: appointmentId,
        },
        data: {
          confirmedAt: null,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro remover confirmação do agendamento')
    }
  }
}
