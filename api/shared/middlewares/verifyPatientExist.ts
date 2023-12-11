import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export const verifyPatientExist = async (patientId: string) => {
  try {
    return await PrismaConnection.patient.findUnique({
      where: {
        id: Number(patientId),
      },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao buscar paciente')
  }
}
