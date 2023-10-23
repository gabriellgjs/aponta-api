import { BaseError } from '@apiErrors/errors'
import { Request, Response } from 'express'

type ErrorProps = Error & Partial<BaseError>

export const ErrorResponse = (
  error: ErrorProps,
  req: Request,
  res: Response,
) => {
  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Internal Server Error.'
  return res.status(statusCode).json({ messagem: message })
}
