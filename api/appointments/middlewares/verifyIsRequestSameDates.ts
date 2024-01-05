import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'
import { Appointments } from '@prisma/client'

export async function verifyIsRequestSameDates(
  dataTimeStart: string,
  dataTimeEnd: string,
  dentistId: number,
) {
  try {
    const sql = `
    (SELECT * 
     FROM appointments p  
     WHERE p."dentistId" = ${dentistId}
        AND p. "dataTimeStart" = '${dataTimeStart}'
        AND p. "dataTimeEnd" = '${dataTimeEnd}'
        AND P."status" = 'Ativo')`

    const listAppointments: Appointments[] =
      await PrismaConnection.$queryRawUnsafe(sql)

    return listAppointments
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Erro ao buscar dentista')
  }
}
