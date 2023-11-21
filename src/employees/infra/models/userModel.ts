import { InternalServerError } from '@apiErrors/errors'
import User from '@employees/domain/entities/user'
import PrismaConnection from '@prisma/prismaConnection'

export default class EmployeesModel {
    private PrismaConnection = PrismaConnection

    async changeEmail(user: User) {
        try {
            return await this.PrismaConnection.user.update({
                where: {
                    id: user.id
                }, data: {
                    email: user.email
                }
            })

        } catch (error) {
            throw new InternalServerError('Erro ao alterar o email do usuário'
            )
        }
    }

    async changePassword(user: User) {
        try {
            return await this.PrismaConnection.user.update({
                where: {
                    id: user.id
                }, data: {
                    password: user.password
                }
            })

        } catch (error) {
            throw new InternalServerError('Erro ao alterar a senha do usuário'
            )
        }
    }

}