export interface Employee {
  id: number
  people: {
    id: number
    name: string
    birthDate: string
    cpf: string
    gender: string
    role: string
    hireDate: string
    maritalStatus: string
    rg: string
    telephone: {
      id: number
      telephoneNumber: string
    }
    address: {
      id: number
      city: string
      district: string
      number: string
      postalCode: string
      state: string
      street: string
    }
  }
  user: {
    id: number
    status: string
    email: string
    password?: string
    roleId: number
    role: {
      description: string
    }
  }
}
