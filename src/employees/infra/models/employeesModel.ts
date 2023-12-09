import { InternalServerError } from '@apiErrors/errors'
import Employee from '@employees/domain/entities/employee'
import PrismaConnection from '@prisma/prismaConnection'

export default class EmployeesModel {
  private PrismaConnection = PrismaConnection

  async createEmployee(employee: Employee): Promise<number | undefined> {
    let data
    try {
      data = await this.PrismaConnection.$transaction([
        this.PrismaConnection.people.create({
          data: {
            name: employee.name,
            birthDate: employee.birthDate,
            rg: employee.rg,
            cpf: employee.cpf,
            gender: employee.gender,
            maritalStatus: employee.maritalStatus,
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
                status: employee.patient?.status ?? 'Ativo',
              },
            },
            employee: {
              create: {
                hireDate: employee.hireDate,
                user: {
                  create: {
                    status: employee.user.status,
                    email: employee.user.email,
                    password: employee.user.password,
                    roleId: employee.user.roleId,
                  },
                },
              },
            },
          },
        }),
      ])

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
      console.log(error)
      throw new InternalServerError('Erro ao criar um funcionário')
    }
  }

  async statusEmployee(employeeId: number) {
    let employee
    try {
      employee = await this.PrismaConnection.employee.findUnique({
        where: {
          id: employeeId,
        },
        select: {
          user: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      })

      return await this.PrismaConnection.$transaction([
        this.PrismaConnection.user.update({
          where: {
            id: employee?.user[0].id,
          },
          data: {
            status: employee?.user[0].status === 'Ativo' ? 'Inativo' : 'Ativo',
          },
        }),
      ])
    } catch (error) {
      throw new InternalServerError(
        `Erro ao ${
          employee?.user[0].status === 'ativo' ? 'inativar' : 'ativar'
        } o funcionário`,
      )
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
            hireDate: employee.hireDate,
            people: {
              update: {
                name: employee.name,
                birthDate: employee.birthDate,
                rg: employee.rg,
                cpf: employee.cpf,
                gender: employee.gender,
                maritalStatus: employee.maritalStatus,
                address: {
                  update: {
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
                  },
                },
                telephone: {
                  update: {
                    where: {
                      id: employee.telephone.id,
                    },
                    data: {
                      telephoneNumber: employee.telephone.telephoneNumber,
                    },
                  },
                },
              },
            },
            user: {
              update: {
                where: {
                  id: employee.user.id,
                },
                data: {
                  email: employee.user.email,
                  roleId: employee.user.roleId,
                },
              },
            },
          },
        }),
      ])
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar um funcionário')
    }
  }

  async updatePersonDetails(employee: Employee) {
    try {
      return await this.PrismaConnection.$transaction([
        this.PrismaConnection.employee.update({
          where: {
            id: employee.id,
          },
          data: {
            hireDate: employee.hireDate,
            people: {
              update: {
                name: employee.name,
                birthDate: employee.birthDate,
                rg: employee.rg,
                cpf: employee.cpf,
                gender: employee.gender,
                maritalStatus: employee.maritalStatus,
                address: {
                  update: {
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
                  },
                },
                telephone: {
                  update: {
                    where: {
                      id: employee.telephone.id,
                    },
                    data: {
                      telephoneNumber: employee.telephone.telephoneNumber,
                    },
                  },
                },
              },
            },
            user: {
              update: {
                where: {
                  id: employee.user.id,
                },
                data: {
                  roleId: employee.user.roleId,
                },
              },
            },
          },
        }),
      ])
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar o funcionário')
    }
  }
}
