import PrismaConnection from '@prisma/prismaConnection'
import { getEmployee } from '../types/employeesTypes'
import { InternalServerError } from '@apiErrors/errors'

export default class EmployeesModel {
  private PrismaConnection = PrismaConnection

  async getEmployees() {
    try {
      return await this.PrismaConnection.employee.findMany({
        select: {
          id: true,
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
          people: {
            include: {
              address: true,
              telephone: true,
              patient: true,
            },
          },
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar o funcionário.')
    }
  }
}
