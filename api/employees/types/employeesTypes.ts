import { Address, Employee, People, Telephone } from '@prisma/client'

export type getEmployee = Promise<
  | (Employee & {
      user: {
        email: string
        role: {
          name: string
        }
      }[]
      people: People & {
        address: Address[]
        telephone: Telephone[]
      }
    })
  | null
>

export type getEmployees = Promise<
  {
    id: number
    people: {
      name: string
    }
  }[]
>

export type responseGetEmployee = {
  id: number
  hireDate: Date
  peopleId: number
  user: {
    id: number
    status: string
    email: string
    roleId: number
    role: {
      name: string
    }
  }[]
  people: People & {
    address: Address[]
    telephone: Telephone[]
  }
}
