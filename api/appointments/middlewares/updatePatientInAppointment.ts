import { NextFunction, Request, Response } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { fromZodError } from 'zod-validation-error'
import { verifyAppointmentExistById } from '@appointmentsAPI/middlewares/verifyAppointmentExistById'
import { updatePatientInAppointmentSchema } from '@appointmentsAPI/schema/updatePatientInAppointmentSchema'
import { verifyIsSamePatientAndDentist } from '@appointmentsAPI/middlewares/verifyIsSamePatientAndDentist'
import { verifyPatientExist } from '@sharedAPI/middlewares/verifyPatientExist'

export default async function updatePatientInAppointment(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const schemaSuccess = await verifySchemaZod(
    updatePatientInAppointmentSchema,
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

  const { patientId } = request.body

  const patientExist = await verifyPatientExist(Number(patientId))

  if (!patientExist) {
    return response.status(400).json({
      status: 400,
      message: 'Esse paciente não existe',
    })
  }

  const isSamePatientAndDentist = await verifyIsSamePatientAndDentist(
    appointmentExist.dentistId,
    patientId,
  )

  if (isSamePatientAndDentist) {
    return response.status(400).json({
      status: 400,
      message: 'Dentista e Paciente não podem ser iguais',
    })
  }

  if (patientExist.status === 'Inativo') {
    return response.status(400).json({
      status: 400,
      message: 'Paciente está inativo',
    })
  }

  next()
}
