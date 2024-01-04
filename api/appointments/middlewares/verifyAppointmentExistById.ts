import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export async function verifyAppointmentExistById(appointmentId: number) {
  try {
    return await PrismaConnection.appointments.findUnique({
      where: {
        id: appointmentId,
      },
    })
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Erro ao buscar dentista')
  }
}
