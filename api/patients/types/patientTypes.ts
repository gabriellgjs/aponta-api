import { Address, Patient, People, Telephone } from '@prisma/client'

export type getPatients = Promise<
  {
    id: number
    people: {
      name: string
    }
  }[]
>

export type responseGetPatients = {
  id: number
  people: {
    name: string
  }
}[]

export type getPatient = Promise<
  | (Patient & {
      people: People & {
        address: Address[]
        telephone: Telephone[]
      }
    })
  | null
>

export type responseGetPatient =
  | (Patient & {
      people: People & {
        address: Address[]
        telephone: Telephone[]
      }
    })
  | null
