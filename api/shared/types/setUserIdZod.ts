import { z } from 'zod'

export type SetUserIdZod = z.ZodObject<
  {
    employeeId: z.ZodNumber
    userId: z.ZodNumber
  },
  'strip',
  z.ZodTypeAny,
  {
    employeeId: number
    userId: number
  },
  {
    employeeId: number
    userId: number
  }
>
