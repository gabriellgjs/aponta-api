import { InternalServerError } from '@apiErrors/errors'
import prismaConnection from '@prisma/prismaConnection'

export async function PatientIsInactive(patientId: number) {
  try {
    const patient = await prismaConnection.patient.findUnique({
      where: {
        id: patientId,
      },
    })

    const isInactive = patient?.status === 'Inativo'

    return {
      inactive: isInactive,
      message: 'Paciente está inativo',
    }
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Erro ao buscar o paciente')
  }
}
