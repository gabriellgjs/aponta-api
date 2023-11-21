import { BaseError } from '@apiErrors/errors'
import { Request, Response } from 'express'
import Sentry from '../../application/sentry'

type ErrorProps = Error & Partial<BaseError>

export const ErrorResponse = async (
  error: ErrorProps,
  req: Request,
  res: Response,
) => {
  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Internal Server Error.'
  const nameError = error.nameError ?? 'Internal Server Error'

  console.log(statusCode)

  await Sentry.sendError(nameError, message)

  return res.status(statusCode).json({ message })
}
