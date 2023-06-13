import { NextFunction, Request, Response } from 'express';
import { BaseError, InternalServerError } from '../Utils/Error/ApiErrors';

type ErrorProps = Error & Partial<BaseError>;

export const ErrorResponse = (
  error: ErrorProps,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error)
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'Internal Server Error.';
  return res.status(statusCode).json({messagem: message});
};
