import { InternalServerError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'

export default class EmployeesModel {
  private PrismaConnection = PrismaConnection

  async getEmployees() {
    try {
      return await this.PrismaConnection.employee.findMany({
        where: {
          user: {
            every: {
              status: 'Ativo',
            },
          },
        },
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

  async getEmployeesInactive() {
    try {
      return await this.PrismaConnection.employee.findMany({
        where: {
          user: {
            every: {
              status: 'Inativo',
            },
          },
        },
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
      throw new InternalServerError('Erro ao listar os funcionários inativos.')
    }
  }

  async getDentistActives() {
    try {
      return await this.PrismaConnection.employee.findMany({
        where: {
          user: {
            every: {
              status: 'Ativo',
              roleId: 2,
            },
          },
        },
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

  async getDentistInactive() {
    try {
      return await this.PrismaConnection.employee.findMany({
        where: {
          user: {
            every: {
              status: 'Inativo',
              roleId: 2,
            },
          },
        },
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
      throw new InternalServerError('Erro ao listar os funcionários inativos.')
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
