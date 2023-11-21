import { Address, Employee, People, Telephone } from '@prisma/client'

export type getEmployee = Promise<
  | (Employee & {
      user: {
        email: string
        role: {
          description: string
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
  hireDate: string
  peopleId: number
  user: {
    id: number
    status: string
    email: string
    roleId: number
    role: {
      description: string
    }
  }[]
  people: People & {
    address: Address[]
    telephone: Telephone[]
  }
}
