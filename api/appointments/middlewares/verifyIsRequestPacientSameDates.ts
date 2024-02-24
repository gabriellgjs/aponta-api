import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'
import { Appointments } from '@prisma/client'

export async function verifyIsRequestPacientSameDates(
  dataTimeStart: string,
  dataTimeEnd: string,
  patientId: number,
) {
  try {
    const sql = `
    (SELECT * 
     FROM appointments p  
     WHERE p."patientId" = ${patientId}
        AND p. "dataTimeStart" = '${dataTimeStart}'
        AND p. "dataTimeEnd" = '${dataTimeEnd}'
        AND P."status" = 'Ativo')`

    const listAppointments: Appointments[] =
      await PrismaConnection.$queryRawUnsafe(sql)

    return listAppointments
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Erro ao verificar se o paciente já está com agendamento no mesmo horário')
  }
}
