import { z } from "zod";

export type SetTerminationDateZod = z.ZodObject<{
  employee_id: z.ZodNumber;
  termination_date: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
  employee_id: number;
  termination_date: string | null;
}, {
  employee_id: number;
  termination_date: string | null;
}>