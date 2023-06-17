import GeneratorErrorResponse from "api/Shared/Utils/Error/Helpers/GeneratorErrorMessages";
import regexName from "api/Shared/Utils/Regex/RegexName";
import { verifyRoleSchema } from "api/Shared/Utils/Zod/ZodVerifySchemas";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export default function CreateRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  verifyMiddlewaresRole(request, response, next);
}

const verifyMiddlewaresRole = async (
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
    .regex(regexName, 'Nome só pode ter letras e acentuações.'),
  });

  verifyRoleSchema(roleSchema, request);

  next();
}