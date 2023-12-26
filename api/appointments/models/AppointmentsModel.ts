import { InternalServerError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'
import dayjs from 'dayjs'

export default class AppointmentsModel {
  private PrismaConnection = PrismaConnection

  async getAppointmentsByDay(date?: string | undefined) {
    try {
      if (!date) {
        return await this.PrismaConnection
          .$queryRaw`SELECT * FROM appointments where aponta.public.appointments ."dataTimeStart"  between current_date and  (current_date  + 1)`
      }

      const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD')

      const sql = `SELECT * FROM appointments where aponta.public.appointments ."dataTimeStart" between '${date}' and '${nextDay}'`

      return await this.PrismaConnection.$queryRawUnsafe(sql)
    } catch (error) {
      throw new InternalServerError('Erro ao listar os agendamentos')
    }
  }

  async getRole(roleId: number) {
    try {
      return await this.PrismaConnection.role.findUnique({
        where: {
          id: roleId,
        },
        select: {
          id: true,
          name: true,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar o cargo')
    }
  }
}
