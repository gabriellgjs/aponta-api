import { prismaConnection } from '@prisma/PrismaConnection';
import { getEmployee } from '../Types/EmployeesTypes';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

export default class EmployeesModel {
  private prismaConnection = prismaConnection;

  async getEmployees() {
    try {
      return await this.prismaConnection.employee.findMany({
        select: {
          id: true,
          people: {
            select: {
              name: true,
              telephone: {
                select: {
                  number: true,
                }
              }
            },
          },
        },
      });
    } catch (error) {
        throw new InternalServerError("Erro ao listar os funcionários.");
    }
  }

  async getEmployeeById(employee_id: number): getEmployee {
    try {
      return await this.prismaConnection.employee.findUnique({
        where: {
          id: employee_id,
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
      });
    } catch (error) {
      throw new InternalServerError("Erro ao listar o funcionário.");
    }
  }
}

// TODO troca a função getEmployees pro sigular
