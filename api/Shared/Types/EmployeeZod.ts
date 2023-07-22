import { z } from 'zod';

export type EmployeeSchemaZod = z.ZodObject<
  {
    hire_date: z.ZodString;
    pis_pasep: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    hire_date: string;
    pis_pasep: string;
  },
  {
    hire_date: string;
    pis_pasep: string;
  }
>;
