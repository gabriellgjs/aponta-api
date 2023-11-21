import PrismaConnection from '@prisma/prismaConnection'
import { BadRequestError, InternalServerError } from '@apiErrors/errors'
import { Response } from 'express'

export const verifyCPFExist = async (cpf: string, response: Response) => {
  try {
    const CPFExist = await PrismaConnection.people.findUnique({
      where: { cpf },
    })

    if (CPFExist) {
      throw new BadRequestError('CPF já cadastrado')
    }
  } catch (error) {
    if (
      error instanceof BadRequestError ||
      error instanceof InternalServerError
    ) {
      return response
        .status(error.statusCode)
        .json({ message: error.message })
        .end()
    }
  }
}
