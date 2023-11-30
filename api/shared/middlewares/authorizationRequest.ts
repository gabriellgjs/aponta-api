import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export default class AuthorizationRequest {
  static validateAuthorization(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const token = request.headers.authorization

    if (!token)
      return response.status(401).json({
        status: 401,
        message: 'Acesso negado.',
      })

    try {
      const secret: string = process.env.JWT_SECRET ?? 'secret'
      response.locals.user = verify(token.replace('Bearer ', ''), secret)
    } catch (error) {
      return response.status(401).json('Invalid Token')
    }

    return next()
  }
}
