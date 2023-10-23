import PrismaConnection from '@prisma/prismaConnection'
import { getEmployee } from '../types/employeesTypes'
import { InternalServerError } from '@apiErrors/errors'

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
        select: {
          id: true,
          user: {
            select: {
              status: true,
            },
          },
          people: {
            select: {
              name: true,
              telephone: {
                select: {
                  telephoneNumber: true,
                },
              },
            },
          },
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar os funcionários.')
    }
  }

  async getEmployeeById(employeeId: number): getEmployee {
    try {
      return await this.PrismaConnection.employee.findUnique({
        where: {
          id: employeeId,
        },
        include: {
          user: {
            select: {
              email: true,
              role: {
                select: {
                  description: true,
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
