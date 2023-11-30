import { BaseError } from '@apiErrors/errors'
import { Request, Response } from 'express'
import Sentry from '../../application/sentry'

type ErrorProps = Error & Partial<BaseError>

export const ErrorResponse = async (
  error: ErrorProps,
  request: Request,
  response: Response,
) => {
  await Sentry.sendError(error.statusCode ?? 500, error.message)
  return response
    .status(error.statusCode ?? 500)
    .json({ message: error.message })
    .end()
}
