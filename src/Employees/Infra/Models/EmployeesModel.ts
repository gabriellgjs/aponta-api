import PrismaConnection from '@prisma/PrismaConnection';
import Employee from '../../Domain/Entities/Employee';

export default class EmployeesModel {
  private prismaConnection: PrismaConnection;

  constructor() {
    this.prismaConnection = new PrismaConnection();
  }

  async createEmployee(employee: Employee): Promise<number | undefined> {
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
              role_id: employee.role_id,
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

    return employee_recorded?.id;
  }

  async deleteEmployee(employee_id: number) {
    const employee = await this.prismaConnection.employee.findMany({
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
      this.prismaConnection.address.deleteMany({
        where: {
          people_id: employee[0].people.id,
        },
      }),
      this.prismaConnection.telephone.deleteMany({
        where: {
          people_id: employee[0].people.id,
        },
      }),
      this.prismaConnection.employee.delete({
        where: {
          id: employee[0].id,
        },
      }),
      this.prismaConnection.people.delete({
        where: {
          id: employee[0].people.id,
        },
      }),
    ]);
  }

  async updateEmployee(employee: Employee) {
      return await this.prismaConnection.$transaction([
        this.prismaConnection.employee.update({
          where: {
            id: employee.id,
          },
          data: {
            status: employee.status,
            hire_date: employee.hire_date,
            termination_date: employee.termination_date,
            role_id: employee.role_id,
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
      ]);
  }
}
