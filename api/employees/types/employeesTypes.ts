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

export type responseGetEmployee =
  | (Employee & {
      user: {
        id: number
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
    })
  | null

export type responseGetEmployees = {
  id: number
  user: {
    status: string
  }[]
  people: {
    name: string
    telephone: {
      telephoneNumber: string
    }[]
  }
}[]
