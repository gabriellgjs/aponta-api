import { NextFunction, Request, Response } from 'express'

import { verifyAppointmentExistById } from '@appointmentsAPI/middlewares/verifyAppointmentExistById'

export default async function RemoveOrAddConfirmAppointmentMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params

  const existAppointment = await verifyAppointmentExistById(Number(id))

  if (!existAppointment) {
    return response.status(400).json({
      status: 400,
      message: 'Agendamento não existe',
    })
  }

  if (existAppointment.status !== 'Ativo') {
    return response.status(400).json({
      status: 400,
      message: 'Esse agendamento já está cancelado ou ele foi reagendando',
    })
  }

  next()
}
