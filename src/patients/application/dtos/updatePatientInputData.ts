export default class UpdatePatientInputData {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly birthDate: Date,
    readonly rg: string,
    readonly cpf: string,
    readonly maritalStatus: string,
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
  ) {}
}
