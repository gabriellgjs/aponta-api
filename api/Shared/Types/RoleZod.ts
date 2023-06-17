import { z } from 'zod';

export type RoleSchemaZod = z.ZodObject<
  {
    name: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    name: string;
  },
  {
    name: string;
  }
>;
