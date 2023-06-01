import PrismaConnection from '@prisma/PrismaConnection';
import { getEmployee } from '../Types/EmployeesTypes';

export default class EmployeesModel {
  private prismaConnection: PrismaConnection;

  constructor() {
    this.prismaConnection = new PrismaConnection();
  }

  //TODO DEVOLVER TODAS AS INFORMAÇÕES DE EMPLOYEE

  async getEmployees() {
    try {
      return await this.prismaConnection.employee.findMany({
        select: {
          id: true,
          people: {
            select: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('erro');
    }
  }

  async getEmployeesById(employee_id: number): getEmployee {
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
            },
          },
        },
      });
    } catch (error) {
      throw new Error('erro');
    }
  }
}
