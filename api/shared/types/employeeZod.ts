import { z } from 'zod'

export type EmployeeSchemaZod = z.ZodObject<
  {
    hireDate: z.ZodString
  },
  'strip',
  z.ZodTypeAny,
  {
    hireDate: string
  },
  {
    hireDate: string
  }
>
