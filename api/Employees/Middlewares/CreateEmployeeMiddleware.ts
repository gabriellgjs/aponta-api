import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { BadRequestError } from 'api/Shared/Utils/Error/ApiErrors';
import GeneratorErrorResponse from 'api/Shared/Utils/Error/Helpers/GeneratorErrorMessages';
import dayjs from 'dayjs';
import { prismaConnection } from '@prisma/PrismaConnection';

export default async function CreateEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewares(request, response, next);
}

const verifyMiddlewares = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const regexName = /^[a-zA-ZÀ-ÖØ-öø-ÿ ]+$/u;
  const createEmployeeSchema = z.object({
    name: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'name',
        ),
      )
      .regex(regexName, 'Nome só pode ter letras e acentuações.'),
    birth_date: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeDateOrRequired(
          'birth_date',
        ),
      )
      .datetime(),
    rg: z.string(
      GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired('rg'),
    ),
    cpf: z.string(
      GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired('cpf'),
    ),
    gender: z.string(
      GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
        'gender',
      ),
    ),
    hire_date: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeDateOrRequired(
          'hire_date',
        ),
      )
      .datetime(),
    role_id: z.number(
      GeneratorErrorResponse.generateErrorMessageInTypeNumberOrRequired(
        'role_id',
      ),
    ),
    pis_pasep: z.string(
      GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
        'pis_pasep',
      ),
    ),
    address: z.object({
      street: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'street',
        ),
      ),
      number: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'number',
        ),
      ),
      district: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'district',
        ),
      ),
      city: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'city',
        ),
      ),
      postalCode: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'postalCode',
        ),
      ),
      state: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'state',
        ),
      ),
    }),
    telephone: z.object({
      number: z.string(
        GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
          'telephone',
        ),
      ),
    }),
  });

  const isParseSuccess = createEmployeeSchema.safeParse(request.body);

  if (!isParseSuccess.success) {
    const { message } = fromZodError(isParseSuccess.error);
    throw new BadRequestError(
      GeneratorErrorResponse.messageResponseError(message),
    );
  }
  const { birth_date } = isParseSuccess.data;
  verifyBirthDate(birth_date);

  const { hire_date } = isParseSuccess.data;
  verifyHireDate(hire_date, birth_date);

  const { role_id } = isParseSuccess.data;
  await verifyRoleExist(role_id);

  next();
};

const verifyHireDate = (
  hire_date: string,
  birth_date: string,
) => {
  const now = dayjs();
  const hire_dateDayjs = dayjs(hire_date);
  const hireDateIsAfterBirth = hire_dateDayjs.isAfter(birth_date);

  if (!hireDateIsAfterBirth) {
    throw new BadRequestError('Data de contração não pode ser antes da data de aniversário');
  }

  const hireDateIsBeforeNow = hire_dateDayjs.isBefore(now);

  if(!hireDateIsBeforeNow) {
    throw new BadRequestError('Data de contratação não pode ser no futuro')
  }
};

const verifyBirthDate = (
  birth_date: string,
) => {
  const now = dayjs();
  const birth_dateDayjs = dayjs(birth_date);
  const birthdayDateIsInTheFuture = birth_dateDayjs.isBefore(now);

  if (!birthdayDateIsInTheFuture) {
    throw new BadRequestError('Data de nascimento não pode ser no futuro');
  }
};

const verifyRoleExist = async (role_id: number) => {
  const role = await prismaConnection.role.findUnique({where: {id: role_id}})

  if(!role) throw new BadRequestError("Cargo não encontrado.")
}
