import { People, PeopleProps } from "./People";

interface PatientProps extends PeopleProps {
  id?: number;
  status?: string;
  marital_status?: string;
  career?: string;
}

export default class PatientCore extends People{
  protected props: PatientProps;

  constructor(props: PatientProps) {
    super({...props});

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
