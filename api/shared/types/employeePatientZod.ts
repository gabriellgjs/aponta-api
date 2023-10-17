import { z } from 'zod'

export type EmployeePatientZod = z.ZodObject<
  {
    patient: z.ZodObject<
      {
        marital_status: z.ZodString
        career: z.ZodString
      },
      'strip',
      z.ZodTypeAny,
      {
        marital_status: string
        career: string
      },
      {
        marital_status: string
        career: string
      }
    >
  },
  'strip',
  z.ZodTypeAny,
  object,
  object
>
