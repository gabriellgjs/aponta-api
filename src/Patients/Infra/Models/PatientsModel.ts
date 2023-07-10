import { prismaConnection } from '@prisma/PrismaConnection';
import { InternalServerError } from 'api/Shared/Utils/Error/ApiErrors';
import Patient from '../../Domain/Entities/Patient';

export default class RolesModel {
  private prismaConnection = prismaConnection;

  async createPatient(patient: Patient) {
    try {
      const data = await this.prismaConnection.$transaction([
        this.prismaConnection.people.create({
          data: {
            name: patient.name,
            birth_date: patient.birth_date,
            rg: patient.rg,
            cpf: patient.cpf,
            gender: patient.gender,
            address: {
              create: {
                street: patient.address.street,
                number: patient.address.number,
                district: patient.address.district,
                city: patient.address.city,
                postal_code: patient.address.postal_code,
                state: patient.address.state,
              },
            },
            telephone: {
              create: {
                number: patient.telephone.number,
              },
            },
            patient: {
              create: {
                status: patient.status,
                marital_status: patient.marital_status,
                career: patient.career,
              },
            },
          },
        }),
      ]);

      const patient_recorded = await this.prismaConnection.patient.findFirst({
        where: {
          people_id: data[0].id,
        },
        select: {
          id: true,
        },
      });

      return patient_recorded!.id;
    } catch (error) {
      throw new InternalServerError('Erro ao criar um paciente.');
    }
  }

  async deletePatient(patientId: number) {
    try {
      return await this.prismaConnection.patient.updateMany({
        where: {
          id: patientId,
          status: 'ativo',
        },
        data: {
          status: 'inativo',
        },
      });
    } catch (error) {
      throw new InternalServerError('Erro ao deletar um paciente.');
    }
  }

  /*async updatePatient(patient: Patient) {
    try {
      return await this.prismaConnection.role.update({
        where: {
          id: role.id,
        },
        data: {
          name: role.name,
        },
      });
    } catch (error) {
      throw new InternalServerError('Erro ao atualizar um paciente.');
    }
  }*/
}
