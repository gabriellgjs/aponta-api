import { z } from 'zod'

export type SetTerminationDateZod = z.ZodObject<
  {
    employeeId: z.ZodNumber
    terminationDate: z.ZodNullable<z.ZodString>
  },
  'strip',
  z.ZodTypeAny,
  {
    employeeId: number
    terminationDate: string | null
  },
  {
    employeeId: number
    terminationDate: string | null
  }
>
