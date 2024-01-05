import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export async function VerifyPatientExist(patientId: number) {
  try {
    return await PrismaConnection.patient.findUnique({
      where: {
        id: patientId,
      },
    })
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Erro ao buscar o paciente')
  }
}
