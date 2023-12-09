import { z } from 'zod'
import { Request } from 'express'

export const verifySchemaZod = async (
  schema: z.ZodObject<any> | z.ZodEffects<any>,
  request: Request,
) => {
  return schema.safeParse(request.body)
}
