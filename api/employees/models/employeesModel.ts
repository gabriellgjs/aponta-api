import { InternalServerError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'

export default class EmployeesModel {
  private PrismaConnection = PrismaConnection

  async getEmployees() {
    try {
      return await this.PrismaConnection.employee.findMany({
        orderBy: {
          people: {
            name: 'asc',
          },
        },
        include: {
          user: {
            select: {
              id: true,
              status: true,
              email: true,
              roleId: true,
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
          people: {
            include: {
              telephone: true,
              address: true,
            },
          },
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar os funcionários.')
    }
  }

  async getEmployeeById(employeeId: number) {
    try {
      return await this.PrismaConnection.employee.findUnique({
        where: {
          id: employeeId,
        },
        include: {
          user: {
            select: {
              id: true,
              status: true,
              email: true,
              roleId: true,
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
          people: {
            include: {
              address: true,
              telephone: true,
            },
          },
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar o funcionário.')
    }
  }
}
