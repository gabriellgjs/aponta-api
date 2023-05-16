import { People, PeopleProps } from '../../../Shared/Domain/Entities/People';
import { Role } from './Role';
import { User } from './User';

//TODO criar alias

interface EmployeeProps extends PeopleProps {
  user: User;
  role: Role;
  hireDate: Date;
  terminationDate: Date | null;
}

export class Employee extends People {
  protected props: EmployeeProps;

  constructor(props: EmployeeProps) {
    super({
      ...props
    });
    
    this.props = {
      ...props,
    };
  }

  get user(): User {
    return this.props.user;
  }

  set user(user: User) {
    this.props.user = user;
  }

  get role(): Role {
    return this.props.role;
  }

  set role(role: Role) {
    this.props.role = role;
  }

  get hireDate(): Date {
    return this.props.hireDate;
  }

  set hireDate(date: Date) {
    this.props.hireDate = date;
  }

  get terminationDate(): Date | null {
    return this.props.terminationDate;
  }

  set terminationDate(date: Date | null) {
    this.props.terminationDate = date;
  }
}