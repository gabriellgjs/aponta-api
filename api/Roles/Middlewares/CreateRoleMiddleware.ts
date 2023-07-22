import GeneratorErrorResponse from "api/Shared/Utils/Error/Helpers/GeneratorErrorMessages";
import regexName from "api/Shared/Utils/Regex/RegexName";
import { verifyRoleSchema } from "api/Shared/Utils/Zod/ZodVerifySchemas";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export default async function CreateRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewareCreateRole(request, response, next);
}

const verifyMiddlewareCreateRole = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => { 
  const roleSchema = z.object({
    name: z
    .string(
      GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
        'name',
      ),
    )
    .regex(regexName, 'Nome só pode ter letras e acentuações.').trim(),
    description: z
    .string(
      GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
        'description',
      ),
    )
    .regex(regexName, 'Descrição só pode ter letras e acentuações.').trim(),
  });

  verifyRoleSchema(roleSchema, request);

  next();
}