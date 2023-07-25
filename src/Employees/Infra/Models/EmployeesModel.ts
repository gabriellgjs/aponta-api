import { prismaConnection } from '@prisma/PrismaConnection';
import Employee from '../../Domain/Entities/Employee';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

export default class EmployeesModel {
  private prismaConnection = prismaConnection;

  async createEmployee(employee: Employee): Promise<number | undefined> {
    try {
      const data = await this.prismaConnection.$transaction([
        this.prismaConnection.people.create({
          data: {
            name: employee.name,
            birth_date: employee.birth_date,
            rg: employee.rg,
            cpf: employee.cpf,
            gender: employee.gender,
            employee: {
              create: {
                status: employee.status,
                hire_date: employee.hire_date,
                pis_pasep: employee.pis_pasep,
              },
            },
            address: {
              create: {
                street: employee.address.street,
                number: employee.address.number,
                district: employee.address.district,
                city: employee.address.city,
                postal_code: employee.address.postal_code,
                state: employee.address.state,
              },
            },
            telephone: {
              create: {
                number: employee.telephone.number,
              },
            },
            patient: {
              create: {
                status: employee.patient.status,
                marital_status: employee.patient.marital_status,
                career: employee.patient.career,
              }
            }
          },
        }),
      ]);

      const employee_recorded = await this.prismaConnection.employee.findFirst({
        where: {
          people_id: data[0].id,
        },
        select: {
          id: true,
        },
      });

      return employee_recorded!.id;
    } catch (error) {
      throw new InternalServerError('Erro ao criar um funcionário');
    }
  }

  async deleteEmployee(employee_id: number) {
    try {
      const employee = await this.prismaConnection.employee.findUnique({
        where: {
          id: employee_id,
        },
        select: {
          id: true,
          user_id: true,
          people: {
            select: {
              id: true,
            },
          },
        },
      });

      return await this.prismaConnection.$transaction([
        this.prismaConnection.employee.update({
          where: {
            id: employee!.id,
          },
          data: {
            status: "inativo"
          },
        }),
      ]);
    } catch (error) {
      throw new InternalServerError('Erro ao deletar um funcionário');
    }
  }

  async updateEmployee(employee: Employee) {
    try {
      return await this.prismaConnection.$transaction([
        this.prismaConnection.employee.update({
          where: {
            id: employee.id,
          },
          data: {
            status: employee.status,
            hire_date: employee.hire_date,
            termination_date: employee.termination_date,
            pis_pasep: employee.pis_pasep,
          },
        }),
        this.prismaConnection.people.update({
          where: {
            id: employee.people_id,
          },
          data: {
            name: employee.name,
            birth_date: employee.birth_date,
            rg: employee.rg,
            cpf: employee.cpf,
            gender: employee.gender,
          },
        }),
        this.prismaConnection.address.update({
          where: {
            id: employee.address.id,
          },
          data: {
            street: employee.address.street,
            number: employee.address.number,
            district: employee.address.district,
            city: employee.address.city,
            postal_code: employee.address.postal_code,
            state: employee.address.state,
          },
        }),
        this.prismaConnection.telephone.update({
          where: {
            id: employee.telephone.id,
          },
          data: {
            number: employee.telephone.number,
          },
        }),
        this.prismaConnection.patient.update({
          where: {
            id: employee.patient.id,
          },
          data: {
            marital_status: employee.patient.marital_status,
            career: employee.patient.career,
          },
        }),
      ]);
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar um funcionário');
    }
  }

  async setUserId(employee_id: number, user_id: number) {
    try {
      await this.prismaConnection.employee.update({
        where: {
          id: employee_id,
        },
        data: {
          user_id: user_id,
        }});
        return;
    } catch (error) {
      throw new InternalServerError('Erro ao setar o usuário em um funcionário');
    }
  }

  async setTerminationDate(employee_id: number, dateOfTerminationDate: Date | null) {
    try {
      if(dateOfTerminationDate)  {
        await this.prismaConnection.employee.update({
          where: {
            id: employee_id,
          },
          data: {
            termination_date: dateOfTerminationDate,
            status: "inativo"
          }});
          return;
        }
        await this.prismaConnection.employee.update({
          where: {
            id: employee_id,
          },
          data: {
            termination_date: dateOfTerminationDate,
            status: "ativo",
          }});
          return;

    } catch (error) {
      throw new InternalServerError('Erro ao definir data de desligamento do funcionário');
    }
  }
}