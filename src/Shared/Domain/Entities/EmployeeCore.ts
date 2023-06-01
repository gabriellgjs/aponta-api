import { People, PeopleProps } from './People';
import UserCore from './UserCore';

interface EmployeeProps extends PeopleProps {
  id?: number;
  status?: string;
  user_id?: number | null;
  role_id: number;
  hire_date: Date;
  termination_date?: Date | null;
  people_id?: number;
  pis_pasep?: string;
}

export default class EmployeeCore extends People {
  protected props: EmployeeProps;

  constructor(props: EmployeeProps) {
    super({
      ...props,
    });

    this.props = {
      ...props,
    };
  }

  get user_id(): number {
    return this.props.user_id ? this.props.user_id : 0;
  }

  set user_id(user_id: number) {
    this.props.user_id = user_id;
  }

  get role_id(): number {
    return this.props.role_id;
  }

  set role_id(role_id: number) {
    this.props.role_id = role_id;
  }

  get hire_date(): Date {
    return this.props.hire_date;
  }

  set hire_date(hire_date: Date) {
    this.props.hire_date = hire_date;
  }

  get termination_date(): Date | null {
    return this.props.termination_date ? this.props.termination_date : null;
  }

  set terminationDate(date: Date | null) {
    this.props.termination_date = date;
  }

  get status(): string {
    return this.props.status ? this.props.status : 'active';
  }

  set status(status: string) {
    this.props.status = status;
  }

  get pis_pasep(): string {
    return this.props.pis_pasep ? this.props.pis_pasep : '';
  }

  set pis_pasep(pis_pasep: string) {
    this.props.pis_pasep = pis_pasep;
  }

  set id(id: number) {
    this.props.id = id;
  }

  get id(): number {
    return this.props.id ? this.props.id : 0;
  }

  get people_id(): number {
    return this.props.people_id ? this.props.people_id : 0;
  }

  set people_id(people_id: number) {
    this.props.people_id = people_id;
  }
}
