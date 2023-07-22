import { prismaConnection } from '@prisma/PrismaConnection';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';

export default class PatientsModel {
  private prismaConnection = prismaConnection;

  async getPatients() {
    try {
      return await this.prismaConnection.patient.findMany({
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
        throw new InternalServerError("Erro ao listar os pacientes.");
    }
  }

  async getPatientById(patient_id: number) {
    try {
      return await this.prismaConnection.patient.findUnique({
        where: {
          id: patient_id,
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
      throw new InternalServerError("Erro ao listar o paciente.");
    }
  }
}
