import { NextFunction, Request, Response } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { fromZodError } from 'zod-validation-error'
import { verifyConflictsTime } from '@appointmentsAPI/middlewares/verifyConflictsTime'
import { verifyIsRequestSameDates } from '@appointmentsAPI/middlewares/verifyIsRequestSameDates'
import { rescheduleAppointmentSchema } from '@appointmentsAPI/schema/rescheduleAppointmentSchema'
import { verifyAppointmentExistById } from '@appointmentsAPI/middlewares/verifyAppointmentExistById'
import { PatientIsInactive } from '@appointmentsAPI/middlewares/PatientIsInactive'
import { verifyDentist } from '@sharedAPI/middlewares/verifyDentist'

export default async function RescheduleAppointmentMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const schemaSuccess = await verifySchemaZod(
    rescheduleAppointmentSchema,
    request,
  )

  if (!schemaSuccess.success) {
    return response.status(400).json({
      status: 400,
      message: fromZodError(schemaSuccess.error).details[0].message ?? '',
    })
  }

  const appointmentExist = await verifyAppointmentExistById(
    Number(request.params.id),
  )

  if (!appointmentExist) {
    return response.status(400).json({
      status: 400,
      message: 'Esse agendamento não existe',
    })
  }

  if (
    appointmentExist.status === 'Reagendado' ||
    appointmentExist.status === 'Cancelado'
  ) {
    const message =
      appointmentExist.status === 'Reagendado'
        ? 'Esse agendamento já está reagendado'
        : 'Esse agendamento está cancelado'
    return response.status(400).json({
      status: 400,
      message,
    })
  }

  const dentistExist = await verifyDentist(appointmentExist.dentistId)

  if (dentistExist[0].status === 'Inativo') {
    return response.status(400).json({
      status: 400,
      message: 'Dentista está inativo',
    })
  }

  const patientIsInactive = await PatientIsInactive(appointmentExist.patientId)

  if (patientIsInactive.inactive) {
    return response.status(400).json({
      status: 400,
      message: patientIsInactive.message,
    })
  }

  const { dataTimeStart, dataTimeEnd } = request.body

  const isSame = await verifyIsRequestSameDates(
    dataTimeStart,
    dataTimeEnd,
    appointmentExist?.dentistId,
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
    appointmentExist.dentistId,
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
