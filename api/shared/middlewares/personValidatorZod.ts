import { Request } from 'express'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'
import { personSchema } from '@sharedAPI/schema/personSchema'

export async function personValidatorZod(request: Request) {
  return await verifySchemaZod(personSchema, request)
}
