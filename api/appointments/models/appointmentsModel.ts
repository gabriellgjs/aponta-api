import { InternalServerError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'
import dayjs from 'dayjs'

export default class AppointmentsModel {
  private PrismaConnection = PrismaConnection

  async getAppointmentsActivesByDay(date: string) {
    try {
      if (date.length === 0) {
        return await this.PrismaConnection
          .$queryRaw`SELECT * FROM appointments p where p."dataTimeStart"  between current_date and  (current_date  + 1) and p."status" = 'Ativo'`
      }

      const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD')

      const sql = `SELECT * FROM appointments p where p."status" = 'Ativo' and p."dataTimeStart" between '${date}' and '${nextDay}' order by "dataTimeStart"`

      return await this.PrismaConnection.$queryRawUnsafe(sql)
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Erro ao listar os agendamentos')
    }
  }

  async getAppointmentsCanceledByDay(date: string) {
    try {
      if (date.length === 0) {
        return await this.PrismaConnection
          .$queryRaw`SELECT * FROM appointments p where p."dataTimeStart"  between current_date and  (current_date  + 1) and p."status" = 'Cancelado'`
      }

      const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD')

      const sql = `SELECT * FROM appointments p where p."status" = 'Cancelado' and p."dataTimeStart" between '${date}' and '${nextDay}' order by "dataTimeStart"`

      return await this.PrismaConnection.$queryRawUnsafe(sql)
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Erro ao listar os agendamentos')
    }
  }
}
