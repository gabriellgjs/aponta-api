import { NextFunction, Request, Response } from 'express';
import VerifyExistEmployeeRegisteredOnRole from './VerifyExistEmployeeRegisteredOnRole.';
import VerifyInAndRoleExist from './VerifyIdAndRoleExist';

export default async function DeleteRoleMiddleware  (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyMiddlewareDeleteRole(request, response, next);
}

const verifyMiddlewareDeleteRole = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { id } = request.params;
  
  await VerifyInAndRoleExist(Number(id));
  await VerifyExistEmployeeRegisteredOnRole(Number(id));

  next();
};

