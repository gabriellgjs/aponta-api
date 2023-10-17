import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export default class AuthorizationRequest {
  static validateAuthorization(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const token = request.headers.authorization

    if (!token) return response.status(401).json('Access denied')

    try {
      const secret: string = process.env.JWT_SECRET ?? 'secret'
      const payload = verify(token.replace('Bearer ', ''), secret)

      response.locals.user = payload
    } catch (error) {
      return response.status(401).json('Invalid Token')
    }

    return next()
  }
}
