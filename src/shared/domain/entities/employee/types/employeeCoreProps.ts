import PatientCoreEmployee from '@shared/domain/entities/patient/patientCoreEmployee'
import { PeopleProps } from '@shared/domain/entities/people/types/peopleCoreProps'
import UserCore from '@shared/domain/entities/user/userCore'

export interface EmployeeProps extends PeopleProps {
  id?: number
  user: UserCore
  hireDate: string
  peopleId?: number
  patient?: PatientCoreEmployee
}
