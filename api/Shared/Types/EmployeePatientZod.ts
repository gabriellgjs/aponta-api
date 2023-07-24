import { z } from "zod";

export type EmployeePatientZod =  z.ZodObject<{
  marital_status: z.ZodString;
  careerg: z.ZodString;
}, "strip", z.ZodTypeAny, {
  marital_status: string;
  careerg: string;
}, {
  marital_status: string;
  careerg: string;
}>;