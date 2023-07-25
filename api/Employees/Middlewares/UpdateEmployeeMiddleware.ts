import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import patientValidatorZod from 'api/Shared/Middlewares/PatientValidatorZod';
import personValidatorZod from 'api/Shared/Middlewares/PersonValidatorZod';
import GeneratorErrorResponse from 'api/Shared/Utils/Error/Helpers/GeneratorErrorMessages';
import { verifyEmployeeSchema } from 'api/Shared/Utils/Zod/ZodVerifySchemas';
import verifyHireDate from './VerifyHireDate';
import VerifyInAndEmployeeExist from './VerifyIdAndEmployeeExist';
import verifyPisPasep from './VerifyPisPasep';

export default async function UpdateEmployeeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewaresEmployee(request, response, next);

  const { id } = request.params;
  
  await VerifyInAndEmployeeExist(Number(id));
}

const verifyMiddlewaresEmployee = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const Person = await personValidatorZod(request);
  await patientValidatorZod(request);
  
  const EmployeeSchema = z.object({
    hire_date: z
      .string(
        GeneratorErrorResponse.generateErrorMessageInTypeDateOrRequired(
          'hire_date',
        ),
      )
      .datetime(),
    pis_pasep: z.string(
      GeneratorErrorResponse.generateErrorMessageInTypeStringOrRequired(
        'pis_pasep',
      ),
    )
  });

  const EmployeeSchemaZodVerify = verifyEmployeeSchema(EmployeeSchema, request);

  verifyHireDate(EmployeeSchemaZodVerify.data.hire_date, Person.data.birth_date);
  verifyPisPasep(EmployeeSchemaZodVerify.data.pis_pasep);
  
  next();
};


//TODO alterar quantidade de caracteres de RG
