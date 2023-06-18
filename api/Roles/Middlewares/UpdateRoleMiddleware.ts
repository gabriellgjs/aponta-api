import GeneratorErrorResponse from "api/Shared/Utils/Error/Helpers/GeneratorErrorMessages";
import regexName from "api/Shared/Utils/Regex/RegexName";
import { verifyRoleSchema } from "api/Shared/Utils/Zod/ZodVerifySchemas";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import VerifyInAndRoleExist from "./VerifyIdAndRoleExist";

export default async function UpdateRoleMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewareUpdateRole(request, response, next);
  const { id } = request.params;
  
  await VerifyInAndRoleExist(Number(id));
}

const verifyMiddlewareUpdateRole = async (
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
  });

  verifyRoleSchema(roleSchema, request);

  next();
}