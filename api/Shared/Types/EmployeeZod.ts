import { z } from 'zod';

export type EmployeeSchemaZod = z.ZodObject<
  {
    hire_date: z.ZodString;
    role_id: z.ZodNumber;
    pis_pasep: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    hire_date: string;
    role_id: number;
    pis_pasep: string;
  },
  {
    hire_date: string;
    role_id: number;
    pis_pasep: string;
  }
>;
