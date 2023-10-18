import PeopleCore from '@shared/domain/entities/people/peopleCore'
import UserCore from '@shared/domain/entities/user/userCore'
import PatientCoreEmployee from '@shared/domain/entities/patient/patientCoreEmployee'
import { EmployeeProps } from './types/employeeCoreProps'

export default class EmployeeCore extends PeopleCore {
  protected props: EmployeeProps

  constructor(props: EmployeeProps) {
    super({
      ...props,
    })

    this.props = {
      ...props,
    }
  }

  get user(): UserCore {
    return this.props.user
  }

  set user(user: UserCore) {
    this.props.user = user
  }

  get hireDate(): string {
    return this.props.hireDate
  }

  set hireDate(hireDate: string) {
    this.props.hireDate = hireDate
  }

  get terminationDate(): string | null {
    return this.props.terminationDate ? this.props.terminationDate : null
  }

  set terminationDate(date: string | null) {
    this.props.terminationDate = date
  }

  set id(id: number) {
    this.props.id = id
  }

  get id(): number {
    return this.props.id ? this.props.id : 0
  }

  get peopleId(): number {
    return this.props.peopleId ? this.props.peopleId : 0
  }

  set peopleId(peopleId: number) {
    this.props.peopleId = peopleId
  }

  get patient(): PatientCoreEmployee | null {
    return this.props.patient ? this.props.patient : null
  }

  set patient(patient: PatientCoreEmployee) {
    this.props.patient = patient
  }
}
