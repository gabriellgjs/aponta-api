import { InternalServerError } from '@apiErrors/errors'
import PrismaConnection from '@prisma/prismaConnection'

export default class PatientsModel {
  private prismaConnection = PrismaConnection

  async getPatients() {
    try {
      return await this.prismaConnection.patient.findMany({
        orderBy: {
          people: {
            name: 'asc',
          },
        },
        include: {
          people: {
            include: {
              telephone: true,
              address: true,
            },
          },
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar os pacientes.')
    }
  }

  async getPatientById(patientId: number) {
    try {
      return await this.prismaConnection.patient.findUnique({
        where: {
          id: patientId,
        },
        include: {
          people: {
            include: {
              address: true,
              telephone: true,
            },
          },
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao listar o paciente.')
    }
  }
}
