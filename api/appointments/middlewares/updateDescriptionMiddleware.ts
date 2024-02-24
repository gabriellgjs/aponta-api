import { NextFunction, Request, Response } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { fromZodError } from 'zod-validation-error'
import { verifyAppointmentExistById } from '@appointmentsAPI/middlewares/verifyAppointmentExistById'
import { updateDescriptionInAppointmentSchema } from '@appointmentsAPI/schema/updateDescriptionInAppointmentSchema'

export default async function updateDescriptionInAppointmentMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const schemaSuccess = await verifySchemaZod(
    updateDescriptionInAppointmentSchema,
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

  if (appointmentExist.status !== 'Ativo') {
    const message =
      appointmentExist.status === 'Reagendado'
        ? 'Esse agendamento está reagendado'
        : 'Esse agendamento está cancelado'
    return response.status(400).json({
      status: 400,
      message,
    })
  }

  next()
}
