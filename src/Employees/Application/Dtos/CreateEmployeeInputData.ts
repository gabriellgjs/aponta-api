export default class CreateEmployeeInputData {
  constructor(
    readonly name: string,
    readonly birth_date: Date,
    readonly rg: string,
    readonly cpf: string,
    readonly gender: string,
    readonly hire_date: Date,
    readonly pis_pasep: string,
    readonly role_id: number,
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
