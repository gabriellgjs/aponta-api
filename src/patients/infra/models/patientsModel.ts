import PrismaConnection from '@prisma/prismaConnection'
import Patient from '@patients/domain/entities/patient'
import { InternalServerError } from '@apiErrors/errors'

export default class RolesModel {
  private PrismaConnection = PrismaConnection

  async createPatient(patient: Patient) {
    try {
      const data = await this.PrismaConnection.$transaction([
        this.PrismaConnection.people.create({
          data: {
            name: patient.name,
            maritalStatus: patient.maritalStatus,
            birthDate: patient.birthDate,
            rg: patient.rg,
            cpf: patient.cpf,
            gender: patient.gender,
            address: {
              create: {
                street: patient.address.street,
                number: patient.address.number,
                district: patient.address.district,
                city: patient.address.city,
                postalCode: patient.address.postalCode,
                state: patient.address.state,
              },
            },
            telephone: {
              create: {
                telephoneNumber: patient.telephone.telephoneNumber,
              },
            },
            patient: {
              create: {
                status: patient.status,
              },
            },
          },
        }),
      ])

      const patientRecorded = await this.PrismaConnection.patient.findFirst({
        where: {
          peopleId: data[0].id,
        },
        select: {
          id: true,
        },
      })

      return patientRecorded?.id
    } catch (error) {
      throw new InternalServerError('Erro ao criar um paciente')
    }
  }

  async deletePatient(patientId: number) {
    try {
      return await this.PrismaConnection.patient.updateMany({
        where: {
          id: patientId,
          status: 'ativo',
        },
        data: {
          status: 'inativo',
        },
      })
    } catch (error) {
      throw new InternalServerError('Erro ao deletar um paciente.')
    }
  }

  /* async updatePatient(patient: Patient) {
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
  } */
}
