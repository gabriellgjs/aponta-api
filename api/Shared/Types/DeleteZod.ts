import { z } from 'zod';

export type DeleteSchemaId = z.ZodObject<
  {
    id: z.ZodNumber;
  },
  'strip',
  z.ZodTypeAny,
  {
    id: number;
  },
  {
    id: number;
  }
>;
