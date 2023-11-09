import { NextFunction, Request, Response } from 'express'
import {fromZodError} from "zod-validation-error";
import {z} from "zod";
import PrismaConnection from "@prisma/prismaConnection";
import {compare} from "bcryptjs";

const changePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
})

const verifyChangePasswordSchema = (request: Request, response: Response) => {
    const isParseSuccess = changePasswordSchema.safeParse(request.body)

    if (isParseSuccess.success) {
        return isParseSuccess
    }

    const { message } = fromZodError(isParseSuccess.error)
    return response.status(404).json({message}).end()
}

const verifyPasswordMatch = async (id: number, passwordRequest: string, response: Response) => {
    const passwordHash = await PrismaConnection.user.findUnique({
        where: {
            id: id,
        }, select: {
            password: true
        }
    }).then((value) => {
        return value?.password;
    })

    const passwordIsMatch = await compare(passwordRequest, passwordHash ?? '')

    console.log(passwordIsMatch)

    if (!passwordIsMatch) return response.status(404).json({message:'A senha atual está incorreta'}).end()
}
export default async function ChangePasswordMiddleware(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const {id} = request.params

    verifyChangePasswordSchema(request, response)
    await verifyPasswordMatch(Number(id), request.body.currentPassword, response)


    next()
}

