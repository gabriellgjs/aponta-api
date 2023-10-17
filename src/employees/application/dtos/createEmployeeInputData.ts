export default class CreateEmployeeInputData {
  constructor(
    readonly name: string,
    readonly birthDate: string,
    readonly rg: string,
    readonly cpf: string,
    readonly gender: string,
    readonly hireDate: string,
    readonly maritalStatus: string,
    readonly address: {
      readonly street: string
      readonly number: string
      readonly district: string
      readonly city: string
      readonly postalCode: string
      readonly state: string
    },
    readonly telephone: {
      readonly telephoneNumber: string
    },
    readonly user: {
      readonly email: string | null
      readonly password: string | null
      readonly roleId: number | null
    },
  ) {}
}
