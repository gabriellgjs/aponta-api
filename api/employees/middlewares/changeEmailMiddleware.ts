import { NextFunction, Request, Response } from 'express'
import {fromZodError} from "zod-validation-error";
import {z} from "zod";
import PrismaConnection from "@prisma/prismaConnection";

const changeEmailSchema = z.object({
    email: z.string().email()
})

const verifyChangeEmailSchema = (request: Request, response: Response) => {
    const isParseSuccess = changeEmailSchema.safeParse(request.body)

    if (isParseSuccess.success) {
        return isParseSuccess
    }

    const { message } = fromZodError(isParseSuccess.error)
    return response.status(401).json({message}).end()
}

const verifyEmailExist = async (email: string, response: Response) => {
    const emailExist = await PrismaConnection.user.findUnique({
        where: { email },
    })

    if (emailExist) return response.status(404).json({message:'Email já cadastrado'}).end()
}
export default async function ChangeEmailMiddleware(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    verifyChangeEmailSchema(request, response)
    await verifyEmailExist(request.body.email, response)

    next()
}

