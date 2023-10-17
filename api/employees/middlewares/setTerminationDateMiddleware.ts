import GeneratorErrorResponse from '@apiErrors/helpers/generatorErrorMessages'
import { verifySetTerminationDateSchema } from '@sharedAPI/utils/zod/zodVerifySchemas'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import verifyTerminationDate from './verifyTerminationDate'

export default async function SetTerminationDateMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySetTerminationDateMiddleware(request, response, next)
}

const verifySetTerminationDateMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const SetTerminationDateSchema = z.object({
    employeeId: z
      .number(
        GeneratorErrorResponse.generateErrorMessageInTypeNumberOrRequired(
          'employeeId',
        ),
      )
      .positive(),
    terminationDate: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeDateOrRequired(
          'terminationDate',
        ),
      )
      .datetime()
      .nullable(),
  })

  const { terminationDate, employeeId } = verifySetTerminationDateSchema(
    SetTerminationDateSchema,
    request,
  ).data

  await verifyTerminationDate(terminationDate, employeeId)

  next()
}
