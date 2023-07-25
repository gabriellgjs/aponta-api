import { z } from "zod";

export type SetUserIdZod = z.ZodObject<{
  employee_id: z.ZodNumber;
  user_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
  employee_id: number;
  user_id: number;
}, {
  employee_id: number;
  user_id: number;
}>