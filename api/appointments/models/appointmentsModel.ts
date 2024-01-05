import { InternalServerError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'
import dayjs from 'dayjs'

export default class AppointmentsModel {
  private PrismaConnection = PrismaConnection

  async getAppointmentsActivesByDay(date: string, dentistId: number) {
    try {
      if (date.length === 0) {
        const sql = `
            SELECT * FROM appointments p 
            WHERE p."dataTimeStart" BETWEEN current_date AND (current_date  + 1) 
            AND p."status" = 'Ativo' 
            ${dentistId !== 0 ? `AND p."dentistId" = ${dentistId}` : ''}
            ORDER BY p."dataTimeStart"`

        return await this.PrismaConnection.$queryRawUnsafe(sql)
      }

      const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD')

      const sql = `
            SELECT * FROM appointments p
            WHERE p."status" = 'Ativo' 
            AND p."dataTimeStart" between '${date}' AND '${nextDay}' 
            ${dentistId !== 0 ? `AND p."dentistId" = ${dentistId}` : ''}
            ORDER BY p."dataTimeStart"`

      return await this.PrismaConnection.$queryRawUnsafe(sql)
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Erro ao listar os agendamentos ativos')
    }
  }

  async getAppointmentsCanceledByDay(date: string, dentistId: number) {
    try {
      if (date.length === 0) {
        const sql = `
            SELECT * FROM appointments p
            WHERE p."dataTimeStart"  BETWEEN current_date AND (current_date  + 1) 
            AND p."status" = 'Cancelado' 
            ${dentistId !== 0 ? `AND p."dentistId" = ${dentistId}` : ''}
            ORDER BY p."dataTimeStart"`

        return await this.PrismaConnection.$queryRawUnsafe(sql)
      }

      const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD')

      const sql = `
        SELECT * FROM appointments p 
        WHERE p."status" = 'Cancelado'
        AND p."dataTimeStart" BETWEEN '${date}' AND '${nextDay}'
        ${dentistId !== 0 ? `AND p."dentistId" = ${dentistId}` : ''}
        ORDER BY p."dataTimeStart"`

      return await this.PrismaConnection.$queryRawUnsafe(sql)
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Erro ao listar os agendamentos cancelados')
    }
  }

  async getAppointmentsRescheduleByDay(date: string, dentistId: number) {
    try {
      if (date.length === 0) {
        const sql = `
            SELECT * FROM appointments p 
            WHERE p."dataTimeStart" between current_date AND (current_date  + 1) 
            AND p."status" = 'Reagendado'
            ${dentistId !== 0 ? `AND p."dentistId" = ${dentistId}` : ''}
            ORDER BY p."dataTimeStart"`

        return await this.PrismaConnection.$queryRawUnsafe(sql)
      }

      const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD')

      const sql = `
        SELECT * FROM appointments p 
        WHERE p."status" = 'Reagendado'
        AND p."dataTimeStart" BETWEEN '${date}' AND '${nextDay}'
        ${dentistId !== 0 ? `AND p."dentistId" = ${dentistId}` : ''}
        ORDER BY p."dataTimeStart"`

      return await this.PrismaConnection.$queryRawUnsafe(sql)
    } catch (error) {
      console.log(error)
      throw new InternalServerError(
        'Erro ao listar os agendamentos reagendados',
      )
    }
  }

  async getAppointmentById(appointmentId: number) {
    try {
      return await PrismaConnection.appointments.findUnique({
        where: {
          id: appointmentId,
        },
      })
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Erro ao buscar agendamento')
    }
  }
}
