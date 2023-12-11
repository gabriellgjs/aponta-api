import PrismaConnection from '@prisma/prismaConnection'
import Patient from '@patients/domain/entities/patient'
import { InternalServerError } from '@apiErrors/errors'

export default class PatientModel {
  private PrismaConnection = PrismaConnection
  async createPatient(patient: Patient): Promise<number | undefined> {
    let data
    try {
      data = await this.PrismaConnection.$transaction([
        this.PrismaConnection.people.create({
          data: {
            name: patient.name,
            birthDate: patient.birthDate,
            rg: patient.rg,
            cpf: patient.cpf,
            gender: patient.gender,
            maritalStatus: patient.maritalStatus,
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
              create: { telephoneNumber: patient.telephone.telephoneNumber },
            },
            patient: { create: { status: patient?.status ?? 'Ativo' } },
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
      console.log(error)
      throw new InternalServerError('Erro ao criar um paciente')
    }
  }

  async statusPatient(patientId: number) {
    let patient
    try {
      patient = await this.PrismaConnection.patient.findUnique({
        where: {
          id: patientId,
        },
        select: {
          id: true,
          status: true,
        },
      })

      return await this.PrismaConnection.$transaction([
        this.PrismaConnection.patient.update({
          where: {
            id: patient?.id,
          },
          data: {
            status: patient?.status === 'Ativo' ? 'Inativo' : 'Ativo',
          },
        }),
      ])
    } catch (error) {
      throw new InternalServerError(
        `Erro ao ${
          patient?.status === 'Ativo' ? 'inativar' : 'ativar'
        } o funcionário`,
      )
    }
  }

  async updatePatient(patient: Patient) {
    try {
      return await this.PrismaConnection.$transaction([
        this.PrismaConnection.patient.update({
          where: {
            id: patient.id,
          },
          data: {
            people: {
              update: {
                name: patient.name,
                birthDate: patient.birthDate,
                rg: patient.rg,
                cpf: patient.cpf,
                gender: patient.gender,
                maritalStatus: patient.maritalStatus,
                address: {
                  update: {
                    where: {
                      id: patient.address.id,
                    },
                    data: {
                      street: patient.address.street,
                      number: patient.address.number,
                      district: patient.address.district,
                      city: patient.address.city,
                      postalCode: patient.address.postalCode,
                      state: patient.address.state,
                    },
                  },
                },
                telephone: {
                  update: {
                    where: {
                      id: patient.telephone.id,
                    },
                    data: {
                      telephoneNumber: patient.telephone.telephoneNumber,
                    },
                  },
                },
              },
            },
          },
        }),
      ])
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Erro ao atualizar um funcionário')
    }
  }
}
