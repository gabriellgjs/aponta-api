export default class CreatePatientInputData {
  constructor(
    readonly name: string,
    readonly birth_date: Date,
    readonly rg: string,
    readonly cpf: string,
    readonly gender: string,
    readonly marital_status: string,
    readonly career: string,
    readonly address: {
      readonly street: string;
      readonly number: string;
      readonly district: string;
      readonly city: string;
      readonly postalCode: string;
      readonly state: string;
    },
    readonly telephone: {
      readonly number: string;
    },
  ) {}
}
