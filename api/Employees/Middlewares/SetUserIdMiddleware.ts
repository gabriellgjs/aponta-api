import GeneratorErrorResponse from "api/Shared/Utils/Error/Helpers/GeneratorErrorMessages";
import { verifySetUserIdSchema } from "api/Shared/Utils/Zod/ZodVerifySchemas";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export default async function SetUserIdMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySetUserIdMiddleware(request, response, next);
}

const verifySetUserIdMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  
  const SetUserIdSchema = z.object({
    employee_id: z
      .number(
        GeneratorErrorResponse.generateErrorMessageInTypeNumberOrRequired(
          'employee_id',
        ),
      ).positive(),
    user_id: z
      .number(
        GeneratorErrorResponse.generateErrorMessageInTypeNumberOrRequired(
          'user_id',
        ),
      ).positive(),
  });

  const SetUserIdSchemaZodVerify = verifySetUserIdSchema(SetUserIdSchema, request);

  next();
};