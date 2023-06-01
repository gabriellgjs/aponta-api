import Address from './AddressCore';
import Telephone from './TelephoneCore';

export interface PeopleProps {
  name: string;
  birth_date: Date;
  rg: string;
  cpf: string;
  gender: string;
  telephone: Telephone;
  address: Address;
}

export abstract class People {
  protected props: PeopleProps;

  constructor(props: PeopleProps) {
    this.props = {
      ...props,
    };
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get birth_date(): Date {
    return this.props.birth_date;
  }

  set birth_date(date: Date) {
    this.props.birth_date = date;
  }

  get rg(): string {
    return this.props.rg;
  }

  set rg(rg: string) {
    this.props.rg = rg;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get telephone(): Telephone {
    return this.props.telephone;
  }

  set telephone(telephone: Telephone) {
    this.props.telephone = telephone;
  }

  get address(): Address {
    return this.props.address;
  }

  set address(address: Address) {
    this.props.address = address;
  }

  get gender(): string {
    return this.props.gender;
  }

  set gender(gender: string) {
    this.props.gender = gender;
  }
}
