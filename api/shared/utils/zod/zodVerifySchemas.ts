import { Request } from 'express'
import { fromZodError } from 'zod-validation-error'
import dayjs from 'dayjs'
import { PersonSchemaZod } from '@sharedAPI/types/personZod'
import { EmployeeSchemaZod } from '@sharedAPI/types/employeeZod'
import { RoleSchemaZod } from '@sharedAPI/types/roleZod'
import { DeleteSchemaId } from '@sharedAPI/types/deleteZod'
import { EmployeePatientZod } from '@sharedAPI/types/employeePatientZod'
import { SetUserIdZod } from '@sharedAPI/types/setUserIdZod'
import { SetTerminationDateZod } from '@sharedAPI/types/setTerminationDateZod'
import { BadRequestError } from '@apiErrors/errors'

export function verifyPersonSchema(schema: PersonSchemaZod, request: Request) {
  //
}

export function verifyRoleSchema(schema: RoleSchemaZod, request: Request) {
  const isParseSuccess = schema.safeParse(request.body)

  if (isParseSuccess.success) {
    return isParseSuccess
  }

  const { message } = fromZodError(isParseSuccess.error)
  throw new BadRequestError({ message })
}

export function verifyDeleteSchema(schema: DeleteSchemaId, request: Request) {
  const isParseSuccess = schema.safeParse(request.params.id)

  if (isParseSuccess.success) {
    return isParseSuccess
  }

  const { message } = fromZodError(isParseSuccess.error)
  throw new BadRequestError({ message })
}

export function verifyEmployeeSchema(
  schema: EmployeeSchemaZod,
  request: Request,
) {
  const isParseSuccess = schema.safeParse(request.body)

  if (isParseSuccess.success) {
    return isParseSuccess
  }

  const { message } = fromZodError(isParseSuccess.error)
  throw new BadRequestError({ message })
}

export function verifySetUserIdSchema(schema: SetUserIdZod, request: Request) {
  const parse = {
    employeeId: Number(request.params.employeeId),
    userId: Number(request.body.userId),
  }

  const isParseSuccess = schema.safeParse(parse)

  if (isParseSuccess.success) {
    return isParseSuccess
  }

  const { message } = fromZodError(isParseSuccess.error)
  throw new BadRequestError({ message })
}

export function verifySetTerminationDateSchema(
  schema: SetTerminationDateZod,
  request: Request,
) {
  const valueOfRequest =
    request.query.termination_date === 'null'
      ? null
      : dayjs(String(request.query.termination_date)).toISOString()

  const parse = {
    employee_id: Number(request.params.employee_id),
    termination_date: valueOfRequest,
  }

  const isParseSuccess = schema.safeParse(parse)

  if (isParseSuccess.success) {
    return isParseSuccess
  }

  const { message } = fromZodError(isParseSuccess.error)
  throw new BadRequestError({ message })
}

export function verifyEmployeePatientSchema(
  schema: EmployeePatientZod,
  request: Request,
) {
  const isParseSuccess = schema.safeParse(request.body)

  if (isParseSuccess.success) {
    return isParseSuccess
  }

  const { message } = fromZodError(isParseSuccess.error)
  throw new BadRequestError({ message })
}
