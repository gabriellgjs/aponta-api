import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { BadRequestError } from 'api/Shared/Utils/Error/ApiErrors';
import GeneratorErrorResponse from 'api/Shared/Utils/Error/Helpers/GeneratorErrorMessages';
import { prismaConnection } from '@prisma/PrismaConnection';

export default async function CreateUserMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const createUserSchema = z.object({
    email: z
      .string(GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired('email'))
      .email(GeneratorErrorResponse.generateErrorMessageEmail()),
    password: z
      .string(GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired('password'))
      .min(6, GeneratorErrorResponse.generateErrorMessageMinLength('password', 6)),
  });

  const isParseSuccess = createUserSchema.safeParse(request.body);

  if (!isParseSuccess.success) {
    const { message } = fromZodError(isParseSuccess.error);
    
    throw new BadRequestError(
      GeneratorErrorResponse.messageResponseError(message),
    );
  }

  const userExist = await prismaConnection.user.findFirst({
    where: {
      email: isParseSuccess.data.email,
    }
  })

  if(userExist) throw new BadRequestError("Usuário já existe!");

  next();
}
