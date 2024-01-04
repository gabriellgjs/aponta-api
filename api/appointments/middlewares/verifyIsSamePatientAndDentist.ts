import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export async function verifyIsSamePatientAndDentist(
  dentistId: number,
  patientId: number,
) {
  try {
    const dentist = await PrismaConnection.employee.findUnique({
      where: {
        id: dentistId,
      },
      select: {
        peopleId: true,
      },
    })

    const patient = await PrismaConnection.patient.findUnique({
      where: {
        id: patientId,
      },
      select: {
        peopleId: true,
      },
    })

    return dentist?.peopleId === patient?.peopleId
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Erro ao buscar dentista')
  }
}
