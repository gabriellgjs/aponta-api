export default class UpdateEmployeeInputData {
  constructor(
    readonly id: number,
    readonly hireDate: string,
    readonly maritalStatus: string,
    readonly peopleId: number,
    readonly name: string,
    readonly birthDate: string,
    readonly rg: string,
    readonly cpf: string,
    readonly gender: string,
    readonly address: {
      readonly id?: number
      readonly street: string
      readonly number: string
      readonly district: string
      readonly city: string
      readonly postalCode: string
      readonly state: string
    },
    readonly telephone: {
      readonly id?: number
      readonly telephoneNumber: string
    },
    readonly user: {
      readonly id?: number
      readonly email: string
      readonly password?: string
      readonly roleId: number
    },
  ) {}
}
