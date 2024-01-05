import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export async function VerifyAppointment(appointmentId: number) {
  try {
    return await PrismaConnection.appointments.findUnique({
      where: { id: appointmentId },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao buscar o agendamento')
  }
}
