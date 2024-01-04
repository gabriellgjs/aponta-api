export default class CreateAppointmentInputData {
  constructor(
    readonly dataTimeStart: string,
    readonly dataTimeEnd: string,
    readonly dentistId: number,
    readonly patientId: number,
  ) {}
}
