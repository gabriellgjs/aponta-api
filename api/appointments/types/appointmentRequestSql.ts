import { Appointments } from '@prisma/client'

export type AppointmentsRequestSql = {
  type: 'last' | 'next'
} & Appointments
