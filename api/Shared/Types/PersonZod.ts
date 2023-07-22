import { z } from 'zod';

export type PersonSchemaZod = z.ZodObject<{
  name: z.ZodString;
  birth_date: z.ZodString;
  rg: z.ZodString;
  cpf: z.ZodString;
  gender: z.ZodString;
  address: z.ZodObject<{
    street: z.ZodString;
    number: z.ZodString;
    district: z.ZodString;
    city: z.ZodString;
    postalCode: z.ZodString;
    state: z.ZodString;
  }>;
  telephone: z.ZodObject<{
    number: z.ZodString;
  }>;
  patient: z.ZodObject<{
    marital_status: z.ZodString;
    career: z.ZodString;
  }>;
}>;
