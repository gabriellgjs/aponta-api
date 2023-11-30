export default class CreatePatientInputData {
  constructor(
    readonly name: string,
    readonly birthDate: Date,
    readonly rg: string,
    readonly cpf: string,
    readonly gender: string,
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
  ) {}
}
