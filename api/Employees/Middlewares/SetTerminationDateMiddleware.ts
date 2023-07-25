import GeneratorErrorResponse from "api/Shared/Utils/Error/Helpers/GeneratorErrorMessages";
import { verifySetTerminationDateSchema } from "api/Shared/Utils/Zod/ZodVerifySchemas";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import verifyTerminationDate from "./verifyTerminationDate";

export default async function SetTerminationDateMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySetTerminationDateMiddleware(request, response, next);
}

const verifySetTerminationDateMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  
  const SetTerminationDateSchema = z.object({
    employee_id: z
      .number(
        GeneratorErrorResponse.generateErrorMessageInTypeNumberOrRequired(
          'employee_id',
        ),
      ).positive(),
      termination_date: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeDateOrRequired(
          'termination_date',
        ),
      ).datetime().nullable(),
  });

  const {termination_date, employee_id} = verifySetTerminationDateSchema(SetTerminationDateSchema, request).data;

  await verifyTerminationDate(termination_date, employee_id);

  next();
};