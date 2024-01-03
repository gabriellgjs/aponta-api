import { NextFunction, Request, Response } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { fromZodError } from 'zod-validation-error'
import { appointmentSchema } from '@appointmentsAPI/schema/appointmentSchema'
import { verifyDentist } from '@sharedAPI/middlewares/verifyDentist'
import { verifyConflictsTime } from '@appointmentsAPI/middlewares/verifyConflictsTime'
import { verifyIsRequestSameDates } from '@appointmentsAPI/middlewares/verifyIsRequestSameDates'
import { Appointments } from '@prisma/client'
import { verifyIsSamePatientAndDentist } from '@appointmentsAPI/middlewares/verifyIsSamePatientAndDentist'

export default async function CreateAppointmentMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const schemaSuccess = await verifySchemaZod(appointmentSchema, request)

  if (!schemaSuccess.success) {
    return response.status(400).json({
      status: 400,
      message: fromZodError(schemaSuccess.error).details[0].message ?? '',
    })
  }

  const { dentistId, patientId, dataTimeStart, dataTimeEnd } = request.body

  const isSamePatientAndDentist = await verifyIsSamePatientAndDentist(
    dentistId,
    patientId,
  )

  if (isSamePatientAndDentist) {
    return response.status(400).json({
      status: 400,
      message: 'Dentista e Paciente não podem ser iguais',
    })
  }

  const dentistExist = await verifyDentist(dentistId)

  if (dentistExist.length === 0) {
    return response.status(400).json({
      status: 400,
      message: 'Dentista informado não corresponde aos cadastrados',
    })
  }

  const isSame = await verifyIsRequestSameDates(
    dataTimeStart,
    dataTimeEnd,
    dentistId,
  )

  if (isSame.length > 0) {
    console.log(isSame)
    return response.status(400).json({
      status: 400,
      message: 'Já existe agendamento para esse dentista nesse horário',
    })
  }

  const existConflictTime = await verifyConflictsTime(
    dataTimeStart,
    dataTimeEnd,
    dentistId,
  )

  if (existConflictTime) {
    return response.status(400).json({
      status: 400,
      message:
        'Exite conflito de agendamento, por favor verificar agendamento e tentar novamente com outros horários',
    })
  }

  next()
}
