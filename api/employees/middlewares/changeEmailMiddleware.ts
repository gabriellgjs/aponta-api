import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import PrismaConnection from '@prisma/prismaConnection'
import { BadRequestError } from '@apiErrors/errors'
import { verifySchemaZod } from '@sharedAPI/middlewares/verifySchemaZod'

const changeEmailSchema = z.object({
  email: z.string().email(),
})

export const verifyEmailExist = async (email: string, response: Response) => {
  try {
    const emailExist = await PrismaConnection.user.findUnique({
      where: { email },
    })

    if (emailExist) {
      throw new BadRequestError('Email já cadastrado')
    }
  } catch (error) {
    if (error instanceof BadRequestError) {
      return response
        .status(error.statusCode)
        .json({ status: error.statusCode, message: error.message })
        .end()
    }
  }
}
export default async function ChangeEmailMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifySchemaZod(changeEmailSchema, request, response)
  await verifyEmailExist(request.body.email, response)

  next()
}
