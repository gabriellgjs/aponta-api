export default class CreateEmployeeInputData {
  constructor(
    readonly name: string,
    readonly birthDate: Date,
    readonly rg: string,
    readonly cpf: string,
    readonly gender: string,
    readonly hireDate: Date,
    readonly pisPasep: string,
    readonly address: {
      readonly street: string
      readonly number: string
      readonly district: string
      readonly city: string
      readonly postalCode: string
      readonly state: string
    },
    readonly telephone: {
      readonly number: string
    },
    readonly patient: {
      readonly marital_status: string
      readonly career: string
    },
    readonly user: {
      readonly email: string | null
      readonly password: string | null
      readonly role_id: number | null
    },
  ) {}
}
