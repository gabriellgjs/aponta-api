export default class UpdateEmployeeInputData {
  constructor(
    readonly id: number,
    readonly status: string,
    readonly hire_date: Date,
    readonly termination_date: Date | null | undefined,
    readonly pis_pasep: string,
    readonly role_id: number,
    readonly user_id: number | null | undefined,
    readonly people_id: number,
    readonly name: string,
    readonly birth_date: Date,
    readonly rg: string,
    readonly cpf: string,
    readonly gender: string,
    readonly address: {
      readonly id?: number;
      readonly street: string;
      readonly number: string;
      readonly district: string;
      readonly city: string;
      readonly postal_code: string;
      readonly state: string;
    },
    readonly telephone: {
      readonly id?: number;
      readonly number: string;
    },
  ) {}
}
