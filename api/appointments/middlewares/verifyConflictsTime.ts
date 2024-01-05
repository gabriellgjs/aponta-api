import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'
import { existConflict } from '@appointmentsAPI/middlewares/existConflict'
import { AppointmentsRequestSql } from '@appointmentsAPI/types/appointmentRequestSql'

export async function verifyConflictsTime(
  dataTimeStart: string,
  dataTimeEnd: string,
  dentistId: number,
) {
  try {
    const sql = `
    (SELECT 'last' as type, p.* 
     FROM appointments p  
     WHERE p. "dataTimeEnd" >= '${dataTimeStart}'
      AND p."dentistId" = ${dentistId}
      AND p."status" = 'Ativo'
     ORDER BY p. "dataTimeEnd"  LIMIT 1)
     UNION
    (SELECT 'next' as type, p.* 
     FROM appointments p
     WHERE p ."dataTimeStart" <= '${dataTimeEnd}'
      AND p."dentistId" = ${dentistId}
      AND p."status" = 'Ativo' 
     ORDER BY p. "dataTimeStart" DESC LIMIT 1)`

    const interval: AppointmentsRequestSql[] =
      await PrismaConnection.$queryRawUnsafe(sql)
    return existConflict(interval, dataTimeStart, dataTimeEnd)
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Erro ao buscar os agendamentos')
  }
}
