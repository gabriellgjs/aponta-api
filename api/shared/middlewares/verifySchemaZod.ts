import { z } from 'zod'
import { Request, Response } from 'express'
import { BadRequestError } from '@apiErrors/errors'
import { fromZodError } from 'zod-validation-error'
import Sentry from '../../application/sentry'

export const verifySchemaZod = async (
  schema: z.ZodObject<any>,
  request: Request,
  response: Response,
) => {
  const isParseSuccess = schema.safeParse(request.body)
  try {
    if (!isParseSuccess.success) {
      throw new BadRequestError(
        fromZodError(isParseSuccess.error).details[0].message ?? '',
      )
    }

    return isParseSuccess
  } catch (error) {
    if (error instanceof BadRequestError) {
      return response
        .status(error.statusCode)
        .json({ status: error.statusCode, message: error.message })
        .end()
    }
  }
}
