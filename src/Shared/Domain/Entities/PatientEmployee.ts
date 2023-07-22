import { PatientProps } from './PatientPeople';
import { PeopleProps } from './People';

interface PatientEmployeeProps
  extends Omit<PatientProps, keyof PeopleProps> {}

export default class PatientEmployee {
  private props: PatientEmployeeProps;

  constructor(props: PatientEmployeeProps) {
    this.props = {
      ...props,
      status: props.status ?? 'ativo',
    };
  }

  get id(): number {
    return this.props.id ? this.props.id : 0;
  }

  set id(id: number) {
    this.props.id = id;
  }

  get status(): string {
    return this.props.status ?? '';
  }

  set status(status: string) {
    this.props.status = status;
  }

  get marital_status(): string {
    return this.props.marital_status ?? '';
  }

  set marital_status(marital_status: string) {
    this.props.marital_status = marital_status;
  }

  get career(): string {
    return this.props.career ?? '';
  }

  set career(career: string) {
    this.props.career = career;
  }
}
