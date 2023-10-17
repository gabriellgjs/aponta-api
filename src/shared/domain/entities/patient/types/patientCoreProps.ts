import { PeopleProps } from '@shared/domain/entities/people/types/peopleCoreProps'

interface PatientProps {
  id?: number
  status?: string | null
}

export interface PatientCoreProps extends PatientProps, PeopleProps {}

export type PatientEmployeeCoreProps = PatientProps
