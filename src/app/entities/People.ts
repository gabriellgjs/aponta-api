import { Andress } from './Address';
import { Telephone } from './Telephone';

export interface PeopleProps {
  name: string;
  birthDate: Date;
  rg: string;
  cpf: string;
  gender: string;
  telephone: Telephone;
  andress: Andress;
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

  get birthDate(): Date {
    return this.props.birthDate;
  }

  set birthDate(date: Date) {
    this.props.birthDate = date;
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

  get andress(): Andress {
    return this.props.andress;
  }

  set andress(andress: Andress) {
    this.props.andress = andress;
  }

  get gender(): string {
    return this.props.gender;
  }

  set gender(gender: string) {
    this.props.gender = gender;
  }
}