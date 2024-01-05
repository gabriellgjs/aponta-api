import { NextFunction, Request, Response } from 'express'

import { verifyAppointmentExistById } from '@appointmentsAPI/middlewares/verifyAppointmentExistById'

export default async function DeleteAppointmentMiddleware(
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

  next()
}
