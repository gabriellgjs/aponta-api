export interface AppointmentsProps {
  id?: number
  status?: string
  description?: string
  confirmedAt?: string
  dataTimeStart: string
  dataTimeEnd: string
  canceledAt?: string

  dentistId: number
  patientId: number

  appointmentId?: number
}
