import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import personValidatorZod from 'api/Shared/Middlewares/PersonValidatorZod';
import GeneratorErrorResponse from 'api/Shared/Utils/Error/Helpers/GeneratorErrorMessages';
import { verifyEmployeeSchema } from 'api/Shared/Utils/Zod/ZodVerifySchemas';
import verifyHireDate from './VerifyHireDate';
import verifyPisPasep from './VerifyPisPasep';
import verifyRoleExist from 'api/Shared/Middlewares/VerifyRoleExist';

export default async function CreateEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewaresEmployee(request, response, next);
}

const verifyMiddlewaresEmployee = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const Person = await personValidatorZod(request);
  
  const EmployeeSchema = z.object({
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
    )
  });

  const EmployeeSchemaZodVerify = verifyEmployeeSchema(EmployeeSchema, request);

  verifyHireDate(EmployeeSchemaZodVerify.data.hire_date, Person.data.birth_date);
  verifyPisPasep(EmployeeSchemaZodVerify.data.pis_pasep);
  await verifyRoleExist(EmployeeSchemaZodVerify.data.role_id);

  next();
};


//TODO alterar quantidade de caracteres de RG
