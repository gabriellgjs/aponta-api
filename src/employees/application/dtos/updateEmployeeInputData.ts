export default class UpdateEmployeeInputData {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly birthDate: Date,
    readonly rg: string,
    readonly cpf: string,
    readonly maritalStatus: string,
    readonly gender: string,
    readonly hireDate: Date,
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
      readonly roleId: number
    },
  ) {}
}
