import { personValidatorZod } from '@sharedAPI/middlewares/personValidatorZod'
import { fromZodError } from 'zod-validation-error'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { employeeSchema } from '@employeesAPI/schema/employeeSchema'
import { Request, Response } from 'express'

export const verifySchemaEmployee = async (
  request: Request,
  response: Response,
) => {
  const personSchemaVerification = await personValidatorZod(request)

  if (!personSchemaVerification.success) {
    return response.status(400).json({
      status: 400,
      message:
        fromZodError(personSchemaVerification.error).details[0].message ?? '',
    })
  }

  const employeeSchemaVerification = await verifySchemaZod(
    employeeSchema,
    request,
  )

  if (!employeeSchemaVerification.success) {
    return response.status(400).json({
      status: 400,
      message:
        fromZodError(employeeSchemaVerification.error).details[0].message ?? '',
    })
  }
}
