import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ZodError, fromZodError } from 'zod-validation-error';

import GenerateErrorResponse from 'api/Shared/Utils/Error/GenerateErrorResponse';

export default function CreateUserMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const createUserSchema = z.object({
    email: z
      .string({
        required_error: GenerateErrorResponse.emptyInputError('email'),
        invalid_type_error: GenerateErrorResponse.stringInputError('email'),
      })
      .email(GenerateErrorResponse.emailInputError()),
    password: z
      .string({
        required_error: GenerateErrorResponse.emptyInputError('senha'),
        invalid_type_error: GenerateErrorResponse.stringInputError('senha'),
      })
      .min(6, GenerateErrorResponse.minInputError('email', 6)),
  });
  try {
    createUserSchema.parse(request.body);
    next();
  } catch (error) {
    const { message } = fromZodError(error as ZodError);
    return response
      .status(400)
      .json({ mensagem: generateResponseError(message) });
  }
}

function generateResponseError(message: string) {
  return message
    .replace(`Validation error: `, '')
    .split(`;`)
    .map((message) => {
      const [mensagem] = message.split(`.`);
      return mensagem.trim();
    })
    .join(', ');
}
