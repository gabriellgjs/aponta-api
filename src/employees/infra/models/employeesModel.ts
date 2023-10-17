import { InternalServerError } from '@apiErrors/errors'
import Employee from '@employees/domain/entities/employee'
import PrismaConnection from '@prisma/prismaConnection'

export default class EmployeesModel {
  private PrismaConnection = PrismaConnection

  async createEmployee(employee: Employee): Promise<number | undefined> {
    let data
    try {
      if (employee.user?.email) {
        data = await this.PrismaConnection.$transaction([
          this.PrismaConnection.people.create({
            data: {
              name: employee.name,
              birthDate: employee.birthDate,
              rg: employee.rg,
              cpf: employee.cpf,
              gender: employee.gender,
              maritalStatus: employee.maritalStatus,
              employee: {
                create: {
                  user: {
                    create: {
                      status: employee.user.status,
                      email: employee.user.email,
                      password: employee.user.password,
                      roleId: employee.user.roleId,
                    },
                  },
                  status: employee.status,
                  hireDate: employee.hireDate,
                },
              },
              address: {
                create: {
                  street: employee.address.street,
                  number: employee.address.number,
                  district: employee.address.district,
                  city: employee.address.city,
                  postalCode: employee.address.postalCode,
                  state: employee.address.state,
                },
              },
              telephone: {
                create: {
                  telephoneNumber: employee.telephone.telephoneNumber,
                },
              },
              patient: {
                create: {
                  status: 'ativo',
                },
              },
            },
          }),
        ])
      } else {
        data = await this.PrismaConnection.$transaction([
          this.PrismaConnection.people.create({
            data: {
              name: employee.name,
              birthDate: employee.birthDate,
              rg: employee.rg,
              cpf: employee.cpf,
              gender: employee.gender,
              maritalStatus: employee.maritalStatus,
              employee: {
                create: {
                  status: employee.status,
                  hireDate: employee.hireDate,
                },
              },
              address: {
                create: {
                  street: employee.address.street,
                  number: employee.address.number,
                  district: employee.address.district,
                  city: employee.address.city,
                  postalCode: employee.address.postalCode,
                  state: employee.address.state,
                },
              },
              telephone: {
                create: {
                  telephoneNumber: employee.telephone.telephoneNumber,
                },
              },
              patient: {
                create: {
                  status: 'ativo',
                },
              },
            },
          }),
        ])
      }

      const employeeRecorded = await this.PrismaConnection.employee.findFirst({
        where: {
          peopleId: data[0].id,
        },
        select: {
          id: true,
        },
      })

      return employeeRecorded?.id
    } catch (error) {
      throw new InternalServerError('Erro ao criar um funcionário')
    }
  }

  async deleteEmployee(employeeId: number) {
    try {
      const employee = await this.PrismaConnection.employee.findUnique({
        where: {
          id: employeeId,
        },
        select: {
          id: true,
          userId: true,
          people: {
            select: {
              id: true,
            },
          },
        },
      })

      return await this.PrismaConnection.$transaction([
        this.PrismaConnection.employee.update({
          where: {
            id: employee?.id,
          },
          data: {
            status: 'inativo',
          },
        }),
      ])
    } catch (error) {
      throw new InternalServerError('Erro ao deletar um funcionário')
    }
  }

  async updateEmployee(employee: Employee) {
    try {
      return await this.PrismaConnection.$transaction([
        this.PrismaConnection.employee.update({
          where: {
            id: employee.id,
          },
          data: {
            status: employee.status,
            hireDate: employee.hireDate,
            terminationDate: employee.terminationDate,
          },
        }),
        this.PrismaConnection.people.update({
          where: {
            id: employee.peopleId,
          },
          data: {
            name: employee.name,
            birthDate: employee.birthDate,
            rg: employee.rg,
            cpf: employee.cpf,
            gender: employee.gender,
            maritalStatus: employee.maritalStatus,
          },
        }),
        this.PrismaConnection.address.update({
          where: {
            id: employee.address.id,
          },
          data: {
            street: employee.address.street,
            number: employee.address.number,
            district: employee.address.district,
            city: employee.address.city,
            postalCode: employee.address.postalCode,
            state: employee.address.state,
          },
        }),
        this.PrismaConnection.telephone.update({
          where: {
            id: employee.telephone.id,
          },
          data: {
            telephoneNumber: employee.telephone.telephoneNumber,
          },
        }),
      ])
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar um funcionário')
    }
  }

  async setUserId(employeeId: number, userId: number) {
    try {
      await this.PrismaConnection.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          userId,
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao setar o usuário em um funcionário')
    }
  }

  async setTerminationDate(
    employeeId: number,
    dateOfTerminationDate: string | null,
  ) {
    try {
      if (dateOfTerminationDate) {
        await this.PrismaConnection.employee.update({
          where: {
            id: employeeId,
          },
          data: {
            terminationDate: dateOfTerminationDate,
            status: 'inativo',
          },
        })
        return
      }
      await this.PrismaConnection.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          terminationDate: dateOfTerminationDate,
          status: 'ativo',
        },
      })
    } catch (error) {
      throw new InternalServerError(
        'Erro ao definir data de desligamento do funcionário',
      )
    }
  }
}
