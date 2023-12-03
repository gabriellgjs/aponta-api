import { z } from 'zod'
import { Request } from 'express'

const verifySchemaZod = async (schema: z.ZodObject<any>, request: Request) => {
  return schema.safeParse(request.body)
}

export default verifySchemaZod
